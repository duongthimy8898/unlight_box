"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCacheScheduler = exports.refreshAllCaches = void 0;
// utils/cacheRefresher.ts
const fixture_service_1 = require("../services/external/fixture.service");
const league_service_1 = require("../services/external/league.service");
const sport_service_1 = require("../services/external/sport.service");
const replay_service_1 = require("../services/internal/replay.service");
const redis_1 = require("./redis");
const refreshAllCaches = async () => {
    try {
        await Promise.all([
            // Fixtures
            fixture_service_1.fixtureService.getAllFixtures().then((data) => redis_1.redisClient.set(`${process.env.REDIS_PREFIX}:fixtures:all`, JSON.stringify(data), { EX: 15 })),
            fixture_service_1.fixtureService
                .getUnfinishedFixtures()
                .then((data) => redis_1.redisClient.set(`${process.env.REDIS_PREFIX}:fixtures:unfinished`, JSON.stringify(data), { EX: 15 })),
            fixture_service_1.fixtureService.getFinishedFixtures().then((data) => redis_1.redisClient.set(`${process.env.REDIS_PREFIX}:fixtures:finished`, JSON.stringify(data), { EX: 15 })),
            // Sports
            sport_service_1.sportService.getAllSports().then((data) => redis_1.redisClient.set(`${process.env.REDIS_PREFIX}:sports:all`, JSON.stringify(data), { EX: 15 })),
            // Leagues
            league_service_1.leagueService.getAllLeagues().then((data) => redis_1.redisClient.set(`${process.env.REDIS_PREFIX}:leagues:all`, JSON.stringify(data), { EX: 15 })),
            // Replays
            replay_service_1.replayService.getAllReplays().then((data) => redis_1.redisClient.set(`${process.env.REDIS_PREFIX}:replays:all`, JSON.stringify(data), { EX: 15 })),
        ]);
        console.log(`[CACHE] Refreshed all caches at ${new Date().toISOString()}`);
    }
    catch (err) {
        console.error("[CACHE] Failed to refresh caches:", err);
    }
};
exports.refreshAllCaches = refreshAllCaches;
const startCacheScheduler = () => {
    let isRefreshing = false;
    // Run immediately once
    (0, exports.refreshAllCaches)();
    // Auto refresh every 10s
    setInterval(async () => {
        if (isRefreshing)
            return; // skip if previous run not finished
        isRefreshing = true;
        try {
            await (0, exports.refreshAllCaches)();
        }
        finally {
            isRefreshing = false;
        }
    }, 10000);
    console.log("[CACHE] Cache refresher started, refreshing every 10 seconds");
};
exports.startCacheScheduler = startCacheScheduler;
