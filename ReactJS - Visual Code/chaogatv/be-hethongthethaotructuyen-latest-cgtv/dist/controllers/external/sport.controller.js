"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSport = exports.getAllSports = void 0;
const sport_service_1 = require("../../services/external/sport.service");
const redis_1 = require("../../db/redis");
const ALL_CACHE_KEY = `${process.env.REDIS_PREFIX}:sports:all`;
const getAllSports = async (req, res) => {
    try {
        const cached = await redis_1.redisClient.get(ALL_CACHE_KEY);
        res.setHeader("Content-Type", "application/json");
        if (cached) {
            return res.send(`{"success":true,"code":200,"message":"Fetched all sports successfully!","data":${cached}}`);
        }
        const data = await sport_service_1.sportService.getAllSports();
        const response = `{"success":true,"code":200,"message":"Fetched sports","data":${JSON.stringify(data)}}`;
        await redis_1.redisClient.set(ALL_CACHE_KEY, JSON.stringify(data), {
            EX: 15,
        });
        return res.send(response);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch sports","error_detail":"${String(err.message)}"}`);
    }
};
exports.getAllSports = getAllSports;
const getSport = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await sport_service_1.sportService.getSport(by, value);
        res.setHeader("Content-Type", "application/json");
        if (!data) {
            res.status(404);
            return res.send(`{"success":false,"code":404,"message":"Sport not found","error_detail":${JSON.stringify({ by, value })}}`);
        }
        res.status(200);
        return res.send(`{"success":true,"code":200,"message":"Fetched sport","data":${JSON.stringify(data)}}`);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch sport","error_detail":"${String(err.message)}"}`);
    }
};
exports.getSport = getSport;
