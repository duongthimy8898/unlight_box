"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReplay = exports.getAllReplays = void 0;
const replay_service_1 = require("../../services/external/replay.service");
const redis_1 = require("../../db/redis");
const ALL_CACHE_KEY = `${process.env.REDIS_PREFIX}:replays:all`;
const getAllReplays = async (req, res) => {
    try {
        const cached = await redis_1.redisClient.get(ALL_CACHE_KEY);
        res.setHeader("Content-Type", "application/json");
        if (cached) {
            return res.send(`{"success":true,"code":200,"message":"Fetched all replays successfully!","data":${cached}}`);
        }
        const data = await replay_service_1.replayService.getAllReplays();
        const response = `{"success":true,"code":200,"message":"Fetched replays","data":${JSON.stringify(data)}}`;
        await redis_1.redisClient.set(ALL_CACHE_KEY, JSON.stringify(data), {
            EX: 15,
        });
        return res.send(response);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch replays","error_detail":"${String(err.message)}"}`);
    }
};
exports.getAllReplays = getAllReplays;
const getReplay = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await replay_service_1.replayService.getReplay(by, value);
        res.setHeader("Content-Type", "application/json");
        if (!data) {
            res.status(404);
            return res.send(`{"success":false,"code":404,"message":"Replay not found","error_detail":${JSON.stringify({ by, value })}}`);
        }
        res.status(200);
        return res.send(`{"success":true,"code":200,"message":"Fetched replay","data":${JSON.stringify(data)}}`);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch replay","error_detail":"${String(err.message)}"}`);
    }
};
exports.getReplay = getReplay;
