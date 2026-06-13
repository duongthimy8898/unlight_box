import "reflect-metadata";
import dotenv from "dotenv";
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { AppDataSource } from "./db/data-source";
import router from "./routes";
import { initSysAccount } from "./seeds/initSysAccount.seed";
import morgan from "morgan";
import { initRedis, redisClient } from "./db/redis";
import { startCacheScheduler } from "./db/startCacheScheduler";
import compression from "compression";
import { fixtureService } from "./services/internal/fixture.service";
import axios from "axios";
import { internalUserService } from "./services/internal/internalUser.service";
import { InternalUserRole } from "./entities/InternalUser.entity";
// import { startCacheScheduler } from "./db/startCacheScheduler";

const app: Application = express();
const PORT = process.env.PORT || 3000;

(async () => {
  await initRedis(); // connect redis trước khi start server
  const keys = await redisClient.keys("myapp:*");
  if (keys.length > 0) {
    console.log(`Clearing ${keys.length} cache keys...`);
    await redisClient.del(keys);
  }
})();

// Middlewares
if (env === "development") app.use(morgan("dev"));
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json("Power by @devlop3");
});

app.use("/api/v1/", router);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

async function initChat() {
  const fs = (await fixtureService.getAllFixtures()).filter((f) => f.chatChannelKeyId === null);
  for (const fixture of fs) {
    try {
      console.log("Initializing chat for fixture ID:", fixture.id);
      let chatChannelKeyId = null;
      const cboxApi = process.env.CBOX_API_URL || "https://www.cbox.ws/apis/threads.php?id=5-960460-0V4sGi&key=c7ea97f4e01bfe5faa03f5c0d30a3471&act=mkthread";
      const responseCbox = await axios.get(cboxApi);
      const dataCbox = responseCbox.data as string;
      const segs = dataCbox.trim().split(/\s+/);
      const cboxId = segs[1]?.trim();
      const cboxKey = segs[2]?.trim();
      if (cboxId && cboxKey) {
        chatChannelKeyId = `${cboxId}-${cboxKey}`;
      }
      fixture.chatChannelKeyId = chatChannelKeyId;
      await fixtureService.updateFixture(fixture.id, { chatChannelKeyId });
      console.log("Chat initialized for fixture ID:", fixture.id, "with chatChannelKeyId:", chatChannelKeyId);
    } catch (error) {
      console.error("Error initializing chat for fixture ID:", fixture.id, error);
    }
  }
}

async function initChannelChat() {
  const users = (await internalUserService.getAllBy("role", InternalUserRole.COMMENTATOR)).filter((f) => f.chatChannelKeyId === null);
  for (const u of users) {
    try {
      console.log("Initializing chat for user ID:", u.id);
      let chatChannelKeyId = null;
      const cboxApi = process.env.CBOX_API_URL || "https://www.cbox.ws/apis/threads.php?id=5-960460-0V4sGi&key=c7ea97f4e01bfe5faa03f5c0d30a3471&act=mkthread";
      const responseCbox = await axios.get(cboxApi);
      const dataCbox = responseCbox.data as string;
      const segs = dataCbox.trim().split(/\s+/);
      const cboxId = segs[1]?.trim();
      const cboxKey = segs[2]?.trim();
      if (cboxId && cboxKey) {
        chatChannelKeyId = `${cboxId}-${cboxKey}`;
      }
      u.chatChannelKeyId = chatChannelKeyId;
      await internalUserService.update(u.id, { chatChannelKeyId });
      console.log("Chat initialized for fixture ID:", u.id, "with chatChannelKeyId:", chatChannelKeyId);
    } catch (error) {
      console.error("Error initializing chat for fixture ID:", u.id, error);
    }
  }
}

AppDataSource.initialize()
  .then(() => {
    console.log("✅ MySQL connected via TypeORM");
    initSysAccount();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      if (process.env.NODE_ENV === "development") {
        initChat();
        initChannelChat();
        startCacheScheduler();
      }
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });

export default app;
