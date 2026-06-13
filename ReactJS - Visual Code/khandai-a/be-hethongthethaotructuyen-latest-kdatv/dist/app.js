"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const env = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${env}` });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./db/data-source");
const routes_1 = __importDefault(require("./routes"));
const initSysAccount_seed_1 = require("./seeds/initSysAccount.seed");
const morgan_1 = __importDefault(require("morgan"));
const redis_1 = require("./db/redis");
const startCacheScheduler_1 = require("./db/startCacheScheduler");
const compression_1 = __importDefault(require("compression"));
const fixture_service_1 = require("./services/internal/fixture.service");
const axios_1 = __importDefault(require("axios"));
const internalUser_service_1 = require("./services/internal/internalUser.service");
const InternalUser_entity_1 = require("./entities/InternalUser.entity");
// import { startCacheScheduler } from "./db/startCacheScheduler";
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(async () => {
    await (0, redis_1.initRedis)(); // connect redis trước khi start server
    const keys = await redis_1.redisClient.keys("myapp:*");
    if (keys.length > 0) {
        console.log(`Clearing ${keys.length} cache keys...`);
        await redis_1.redisClient.del(keys);
    }
})();
// Middlewares
if (env === "development")
    app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get("/", (req, res) => {
    res.json("Power by @devlop3");
});
app.use("/api/v1/", routes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});
async function initChat() {
    const fs = (await fixture_service_1.fixtureService.getAllFixtures()).filter((f) => f.chatChannelKeyId === null);
    for (const fixture of fs) {
        try {
            console.log("Initializing chat for fixture ID:", fixture.id);
            let chatChannelKeyId = null;
            const cboxApi = process.env.CBOX_API_URL || "https://www.cbox.ws/apis/threads.php?id=5-960460-0V4sGi&key=c7ea97f4e01bfe5faa03f5c0d30a3471&act=mkthread";
            const responseCbox = await axios_1.default.get(cboxApi);
            const dataCbox = responseCbox.data;
            const segs = dataCbox.trim().split(/\s+/);
            const cboxId = segs[1]?.trim();
            const cboxKey = segs[2]?.trim();
            if (cboxId && cboxKey) {
                chatChannelKeyId = `${cboxId}-${cboxKey}`;
            }
            fixture.chatChannelKeyId = chatChannelKeyId;
            await fixture_service_1.fixtureService.updateFixture(fixture.id, { chatChannelKeyId });
            console.log("Chat initialized for fixture ID:", fixture.id, "with chatChannelKeyId:", chatChannelKeyId);
        }
        catch (error) {
            console.error("Error initializing chat for fixture ID:", fixture.id, error);
        }
    }
}
async function initChannelChat() {
    const users = (await internalUser_service_1.internalUserService.getAllBy("role", InternalUser_entity_1.InternalUserRole.COMMENTATOR)).filter((f) => f.chatChannelKeyId === null);
    for (const u of users) {
        try {
            console.log("Initializing chat for user ID:", u.id);
            let chatChannelKeyId = null;
            const cboxApi = process.env.CBOX_API_URL || "https://www.cbox.ws/apis/threads.php?id=5-960460-0V4sGi&key=c7ea97f4e01bfe5faa03f5c0d30a3471&act=mkthread";
            const responseCbox = await axios_1.default.get(cboxApi);
            const dataCbox = responseCbox.data;
            const segs = dataCbox.trim().split(/\s+/);
            const cboxId = segs[1]?.trim();
            const cboxKey = segs[2]?.trim();
            if (cboxId && cboxKey) {
                chatChannelKeyId = `${cboxId}-${cboxKey}`;
            }
            u.chatChannelKeyId = chatChannelKeyId;
            await internalUser_service_1.internalUserService.update(u.id, { chatChannelKeyId });
            console.log("Chat initialized for fixture ID:", u.id, "with chatChannelKeyId:", chatChannelKeyId);
        }
        catch (error) {
            console.error("Error initializing chat for fixture ID:", u.id, error);
        }
    }
}
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ MySQL connected via TypeORM");
    (0, initSysAccount_seed_1.initSysAccount)();
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        if (process.env.NODE_ENV === "development") {
            initChat();
            initChannelChat();
            (0, startCacheScheduler_1.startCacheScheduler)();
        }
    });
})
    .catch((err) => {
    console.error("❌ DB connection error:", err);
});
exports.default = app;
