"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// workers/cacheWorker.ts
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
const data_source_1 = require("../db/data-source");
const startCacheScheduler_1 = require("../db/startCacheScheduler");
const redis_1 = require("../db/redis");
const runCacheWorker = async () => {
    try {
        // 1️⃣ Init Redis
        (0, redis_1.initRedis)();
        // 2️⃣ Init MySQL / TypeORM
        await data_source_1.AppDataSource.initialize();
        console.log("✅ MySQL connected for cache refresher");
        // 3️⃣ Start cache scheduler
        (0, startCacheScheduler_1.startCacheScheduler)();
    }
    catch (err) {
        console.error("❌ Cache refresher startup failed:", err);
    }
};
// Start worker
runCacheWorker();
