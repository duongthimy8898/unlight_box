"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFixture = exports.getFinishedFixtures = exports.getUnfinishedFixtures = exports.getAllFixtures = void 0;
const fixture_service_1 = require("../../services/external/fixture.service");
const redis_1 = require("../../db/redis");
/**
 * L0 (in-process) cache: cache ONLY `data` (raw JSON string).
 * - TTL L0: 1s (configurable)
 * - Redis TTL: 15s (as you set)
 * - Also includes "single-flight" to prevent stampede when cache expires.
 */
const L0_TTL_MS = 1000;
const l0Cache = new Map();
const inflight = new Map();
function l0Get(key) {
    const entry = l0Cache.get(key);
    if (!entry)
        return null;
    if (Date.now() >= entry.expireAt) {
        l0Cache.delete(key);
        return null;
    }
    return entry.value;
}
function l0Set(key, value) {
    l0Cache.set(key, { value, expireAt: Date.now() + L0_TTL_MS });
}
async function getDataJsonStringWithL0(key) {
    // 1) L0
    const l0 = l0Get(key);
    if (l0)
        return l0;
    // 2) Single-flight: if many requests hit at once, only 1 should call Redis
    const inF = inflight.get(key);
    if (inF)
        return inF;
    const p = (async () => {
        const v = await redis_1.redisClient.get(key);
        if (v)
            l0Set(key, v);
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
function sendSuccessWithCachedData(res, message, cachedDataJson) {
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
async function setRedisDataJsonString(key, dataJson, exSeconds) {
    await redis_1.redisClient.set(key, dataJson, { EX: exSeconds });
    l0Set(key, dataJson); // warm L0 immediately
}
/**
 * GET all fixtures
 */
const ALL_CACHE_KEY = `${process.env.REDIS_PREFIX}:fixtures:all`;
const getAllFixtures = async (req, res) => {
    try {
        const cached = await getDataJsonStringWithL0(ALL_CACHE_KEY);
        if (cached) {
            return sendSuccessWithCachedData(res, "Fetched all fixtures successfully!", cached);
        }
        const data = await fixture_service_1.fixtureService.getAllFixtures();
        const dataJson = JSON.stringify(data);
        await setRedisDataJsonString(ALL_CACHE_KEY, dataJson, 15);
        return sendSuccessWithCachedData(res, "Fetched all fixtures successfully", dataJson);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch fixtures","error_detail":${JSON.stringify(String(err?.message ?? err))}}`);
    }
};
exports.getAllFixtures = getAllFixtures;
const UNFINISHED_CACHE_KEY = `${process.env.REDIS_PREFIX}:fixtures:unfinished`;
const getUnfinishedFixtures = async (req, res) => {
    try {
        const cached = await getDataJsonStringWithL0(UNFINISHED_CACHE_KEY);
        if (cached) {
            return sendSuccessWithCachedData(res, "Fetched all fixtures successfully!", cached);
        }
        const data = await fixture_service_1.fixtureService.getUnfinishedFixtures();
        const dataJson = JSON.stringify(data);
        await setRedisDataJsonString(UNFINISHED_CACHE_KEY, dataJson, 15);
        return sendSuccessWithCachedData(res, "Fetched all fixtures successfully", dataJson);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch fixtures","error_detail":${JSON.stringify(String(err?.message ?? err))}}`);
    }
};
exports.getUnfinishedFixtures = getUnfinishedFixtures;
const FINISHED_CACHE_KEY = `${process.env.REDIS_PREFIX}:fixtures:finished`;
const getFinishedFixtures = async (req, res) => {
    try {
        const cached = await getDataJsonStringWithL0(FINISHED_CACHE_KEY);
        if (cached) {
            return sendSuccessWithCachedData(res, "Fetched all fixtures successfully!", cached);
        }
        const data = await fixture_service_1.fixtureService.getFinishedFixtures();
        const dataJson = JSON.stringify(data);
        await setRedisDataJsonString(FINISHED_CACHE_KEY, dataJson, 15);
        return sendSuccessWithCachedData(res, "Fetched all fixtures successfully", dataJson);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch fixtures","error_detail":${JSON.stringify(String(err?.message ?? err))}}`);
    }
};
exports.getFinishedFixtures = getFinishedFixtures;
/**
 * GET fixture by id | slug
 * (No Redis caching here as per your original file; still avoids extra overhead.)
 */
const getFixture = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await fixture_service_1.fixtureService.getFixture(by, value);
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (!data) {
            res.status(404);
            return res.send(`{"success":false,"code":404,"message":"Fixture not found","error_detail":${JSON.stringify({
                by,
                value,
            })}}`);
        }
        res.status(200);
        return res.send(`{"success":true,"code":200,"message":"Fetched fixture successfully","data":${JSON.stringify(data)}}`);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch fixture","error_detail":${JSON.stringify(String(err?.message ?? err))}}`);
    }
};
exports.getFixture = getFixture;
