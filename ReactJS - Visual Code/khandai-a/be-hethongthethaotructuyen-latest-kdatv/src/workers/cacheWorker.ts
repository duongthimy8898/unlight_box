// workers/cacheWorker.ts
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
import { AppDataSource } from "../db/data-source";
import { startCacheScheduler } from "../db/startCacheScheduler";
import { initRedis } from "../db/redis";

const runCacheWorker = async (): Promise<void> => {
  try {
    // 1️⃣ Init Redis
    initRedis();

    // 2️⃣ Init MySQL / TypeORM
    await AppDataSource.initialize();
    console.log("✅ MySQL connected for cache refresher");

    // 3️⃣ Start cache scheduler
    startCacheScheduler();
  } catch (err: any) {
    console.error("❌ Cache refresher startup failed:", err);
  }
};

// Start worker
runCacheWorker();
