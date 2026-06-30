import { Request, Response } from "express";
import { leagueService } from "../../services/external/league.service";
import { redisClient } from "../../db/redis";

const ALL_CACHE_KEY = `${process.env.REDIS_PREFIX}:leagues:all`;

export const getAllLeagues = async (req: Request, res: Response) => {
  try {
    const cached = await redisClient.get(ALL_CACHE_KEY);
    res.setHeader("Content-Type", "application/json");

    if (cached) {
      // ✅ cached là raw JSON string của data
      return res.send(`{"success":true,"code":200,"message":"Fetched all leagues successfully!","data":${cached}}`);
    }

    const data = await leagueService.getAllLeagues();
    const response = `{"success":true,"code":200,"message":"Fetched leagues","data":${JSON.stringify(data)}}`;

    await redisClient.set(ALL_CACHE_KEY, JSON.stringify(data), {
      EX: 15,
    });

    return res.send(response);
  } catch (err: any) {
    res.status(500);
    res.setHeader("Content-Type", "application/json");
    return res.send(`{"success":false,"code":500,"message":"Failed to fetch leagues","error_detail":"${String(err.message)}"}`);
  }
};

export const getLeague = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: "id" | "slug"; value: string };
    const data = await leagueService.getLeague(by, value);

    res.setHeader("Content-Type", "application/json");

    if (!data) {
      res.status(404);
      return res.send(`{"success":false,"code":404,"message":"League not found","error_detail":${JSON.stringify({ by, value })}}`);
    }

    res.status(200);
    return res.send(`{"success":true,"code":200,"message":"Fetched league","data":${JSON.stringify(data)}}`);
  } catch (err: any) {
    res.status(500);
    res.setHeader("Content-Type", "application/json");
    return res.send(`{"success":false,"code":500,"message":"Failed to fetch league","error_detail":"${String(err.message)}"}`);
  }
};
