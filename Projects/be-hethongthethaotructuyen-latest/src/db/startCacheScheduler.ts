// utils/cacheRefresher.ts
import { fixtureService } from "../services/external/fixture.service";
import { leagueService } from "../services/external/league.service";
import { sportService } from "../services/external/sport.service";
import { replayService } from "../services/internal/replay.service";
import { redisClient } from "./redis";

export const refreshAllCaches = async () => {
  try {
    await Promise.all([
      // Fixtures
      fixtureService.getAllFixtures().then((data) => redisClient.set(`${process.env.REDIS_PREFIX}:fixtures:all`, JSON.stringify(data), { EX: 15 })),

      fixtureService
        .getUnfinishedFixtures()
        .then((data) => redisClient.set(`${process.env.REDIS_PREFIX}:fixtures:unfinished`, JSON.stringify(data), { EX: 15 })),

      fixtureService.getFinishedFixtures().then((data) => redisClient.set(`${process.env.REDIS_PREFIX}:fixtures:finished`, JSON.stringify(data), { EX: 15 })),

      // Sports
      sportService.getAllSports().then((data) => redisClient.set(`${process.env.REDIS_PREFIX}:sports:all`, JSON.stringify(data), { EX: 15 })),

      // Leagues
      leagueService.getAllLeagues().then((data) => redisClient.set(`${process.env.REDIS_PREFIX}:leagues:all`, JSON.stringify(data), { EX: 15 })),

      // Replays
      replayService.getAllReplays().then((data) => redisClient.set(`${process.env.REDIS_PREFIX}:replays:all`, JSON.stringify(data), { EX: 15 })),
    ]);

    console.log(`[CACHE] Refreshed all caches at ${new Date().toISOString()}`);
  } catch (err) {
    console.error("[CACHE] Failed to refresh caches:", err);
  }
};

export const startCacheScheduler = () => {
  let isRefreshing = false;

  // Run immediately once
  refreshAllCaches();

  // Auto refresh every 10s
  setInterval(async () => {
    if (isRefreshing) return; // skip if previous run not finished
    isRefreshing = true;

    try {
      await refreshAllCaches();
    } finally {
      isRefreshing = false;
    }
  }, 10000);

  console.log("[CACHE] Cache refresher started, refreshing every 10 seconds");
};
