import { Request, Response } from "express";
import { fixtureService } from "../../services/external/fixture.service";
import { redisClient } from "../../db/redis";

/**
 * L0 (in-process) cache: cache ONLY `data` (raw JSON string).
 * - TTL L0: 1s (configurable)
 * - Redis TTL: 15s (as you set)
 * - Also includes "single-flight" to prevent stampede when cache expires.
 */
const L0_TTL_MS = 1000;

type L0Entry = {
  value: string; // raw JSON string of data: e.g. "[{...}]" or "{...}"
  expireAt: number;
};

const l0Cache = new Map<string, L0Entry>();
const inflight = new Map<string, Promise<string | null>>();

function l0Get(key: string): string | null {
  const entry = l0Cache.get(key);
  if (!entry) return null;
  if (Date.now() >= entry.expireAt) {
    l0Cache.delete(key);
    return null;
  }
  return entry.value;
}

function l0Set(key: string, value: string) {
  l0Cache.set(key, { value, expireAt: Date.now() + L0_TTL_MS });
}

async function getDataJsonStringWithL0(key: string): Promise<string | null> {
  // 1) L0
  const l0 = l0Get(key);
  if (l0) return l0;

  // 2) Single-flight: if many requests hit at once, only 1 should call Redis
  const inF = inflight.get(key);
  if (inF) return inF;

  const p = (async () => {
    const v = await redisClient.get(key);
    if (v) l0Set(key, v);
    return v;
  })()
    .catch(() => null)
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, p);
  return p;
}

/**
 * Write response without JSON.parse / JSON.stringify on HIT.
 * cachedDataJson must be a valid JSON value for `data` (array/object).
 */
function sendSuccessWithCachedData(res: Response, message: string, cachedDataJson: string) {
  res.status(200);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // Avoid building a huge concatenated string each request (GC pressure).
  res.write('{"success":true,"code":200,"message":');
  res.write(JSON.stringify(message));
  res.write(',"data":');
  res.write(cachedDataJson);
  res.end("}");
}

/**
 * SET redis only stores data json string (not full payload)
 */
async function setRedisDataJsonString(key: string, dataJson: string, exSeconds: number) {
  await redisClient.set(key, dataJson, { EX: exSeconds });
  l0Set(key, dataJson); // warm L0 immediately
}

/**
 * GET all fixtures
 */
const ALL_CACHE_KEY = `${process.env.REDIS_PREFIX}:fixtures:all`;
export const getAllFixtures = async (req: Request, res: Response) => {
  try {
    const cached = await getDataJsonStringWithL0(ALL_CACHE_KEY);
    if (cached) {
      return sendSuccessWithCachedData(res, "Fetched all fixtures successfully!", cached);
    }

    const data = await fixtureService.getAllFixtures();
    const dataJson = JSON.stringify(data);

    await setRedisDataJsonString(ALL_CACHE_KEY, dataJson, 15);

    return sendSuccessWithCachedData(res, "Fetched all fixtures successfully", dataJson);
  } catch (err: any) {
    res.status(500);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.send(`{"success":false,"code":500,"message":"Failed to fetch fixtures","error_detail":${JSON.stringify(String(err?.message ?? err))}}`);
  }
};

const UNFINISHED_CACHE_KEY = `${process.env.REDIS_PREFIX}:fixtures:unfinished`;
export const getUnfinishedFixtures = async (req: Request, res: Response) => {
  try {
    const cached = await getDataJsonStringWithL0(UNFINISHED_CACHE_KEY);
    if (cached) {
      return sendSuccessWithCachedData(res, "Fetched all fixtures successfully!", cached);
    }

    const data = await fixtureService.getUnfinishedFixtures();
    const dataJson = JSON.stringify(data);

    await setRedisDataJsonString(UNFINISHED_CACHE_KEY, dataJson, 15);

    return sendSuccessWithCachedData(res, "Fetched all fixtures successfully", dataJson);
  } catch (err: any) {
    res.status(500);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.send(`{"success":false,"code":500,"message":"Failed to fetch fixtures","error_detail":${JSON.stringify(String(err?.message ?? err))}}`);
  }
};

const FINISHED_CACHE_KEY = `${process.env.REDIS_PREFIX}:fixtures:finished`;
export const getFinishedFixtures = async (req: Request, res: Response) => {
  try {
    const cached = await getDataJsonStringWithL0(FINISHED_CACHE_KEY);
    if (cached) {
      return sendSuccessWithCachedData(res, "Fetched all fixtures successfully!", cached);
    }

    const data = await fixtureService.getFinishedFixtures();
    const dataJson = JSON.stringify(data);

    await setRedisDataJsonString(FINISHED_CACHE_KEY, dataJson, 15);

    return sendSuccessWithCachedData(res, "Fetched all fixtures successfully", dataJson);
  } catch (err: any) {
    res.status(500);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.send(`{"success":false,"code":500,"message":"Failed to fetch fixtures","error_detail":${JSON.stringify(String(err?.message ?? err))}}`);
  }
};

/**
 * GET fixture by id | slug
 * (No Redis caching here as per your original file; still avoids extra overhead.)
 */
export const getFixture = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: "id" | "slug"; value: string };
    const data = await fixtureService.getFixture(by, value);

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (!data) {
      res.status(404);
      return res.send(
        `{"success":false,"code":404,"message":"Fixture not found","error_detail":${JSON.stringify({
          by,
          value,
        })}}`
      );
    }

    res.status(200);
    return res.send(`{"success":true,"code":200,"message":"Fetched fixture successfully","data":${JSON.stringify(data)}}`);
  } catch (err: any) {
    res.status(500);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.send(`{"success":false,"code":500,"message":"Failed to fetch fixture","error_detail":${JSON.stringify(String(err?.message ?? err))}}`);
  }
};
