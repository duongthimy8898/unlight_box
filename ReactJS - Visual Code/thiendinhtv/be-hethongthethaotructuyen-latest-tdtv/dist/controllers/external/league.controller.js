"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeague = exports.getAllLeagues = void 0;
const league_service_1 = require("../../services/external/league.service");
const redis_1 = require("../../db/redis");
const ALL_CACHE_KEY = `${process.env.REDIS_PREFIX}:leagues:all`;
const getAllLeagues = async (req, res) => {
    try {
        const cached = await redis_1.redisClient.get(ALL_CACHE_KEY);
        res.setHeader("Content-Type", "application/json");
        if (cached) {
            // ✅ cached là raw JSON string của data
            return res.send(`{"success":true,"code":200,"message":"Fetched all leagues successfully!","data":${cached}}`);
        }
        const data = await league_service_1.leagueService.getAllLeagues();
        const response = `{"success":true,"code":200,"message":"Fetched leagues","data":${JSON.stringify(data)}}`;
        await redis_1.redisClient.set(ALL_CACHE_KEY, JSON.stringify(data), {
            EX: 15,
        });
        return res.send(response);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch leagues","error_detail":"${String(err.message)}"}`);
    }
};
exports.getAllLeagues = getAllLeagues;
const getLeague = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await league_service_1.leagueService.getLeague(by, value);
        res.setHeader("Content-Type", "application/json");
        if (!data) {
            res.status(404);
            return res.send(`{"success":false,"code":404,"message":"League not found","error_detail":${JSON.stringify({ by, value })}}`);
        }
        res.status(200);
        return res.send(`{"success":true,"code":200,"message":"Fetched league","data":${JSON.stringify(data)}}`);
    }
    catch (err) {
        res.status(500);
        res.setHeader("Content-Type", "application/json");
        return res.send(`{"success":false,"code":500,"message":"Failed to fetch league","error_detail":"${String(err.message)}"}`);
    }
};
exports.getLeague = getLeague;
