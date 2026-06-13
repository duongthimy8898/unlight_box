import { Request, Response } from "express";
import { sportService } from "../../services/external/sport.service";
import { redisClient } from "../../db/redis";

const ALL_CACHE_KEY = `${process.env.REDIS_PREFIX}:sports:all`;

export const getAllSports = async (req: Request, res: Response) => {
  try {
    const cached = await redisClient.get(ALL_CACHE_KEY);
    res.setHeader("Content-Type", "application/json");

    if (cached) {
      return res.send(`{"success":true,"code":200,"message":"Fetched all sports successfully!","data":${cached}}`);
    }

    const data = await sportService.getAllSports();
    const response = `{"success":true,"code":200,"message":"Fetched sports","data":${JSON.stringify(data)}}`;

    await redisClient.set(ALL_CACHE_KEY, JSON.stringify(data), {
      EX: 15,
    });

    return res.send(response);
  } catch (err: any) {
    res.status(500);
    res.setHeader("Content-Type", "application/json");
    return res.send(`{"success":false,"code":500,"message":"Failed to fetch sports","error_detail":"${String(err.message)}"}`);
  }
};

export const getSport = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: "id" | "slug"; value: string };
    const data = await sportService.getSport(by, value);

    res.setHeader("Content-Type", "application/json");

    if (!data) {
      res.status(404);
      return res.send(`{"success":false,"code":404,"message":"Sport not found","error_detail":${JSON.stringify({ by, value })}}`);
    }

    res.status(200);
    return res.send(`{"success":true,"code":200,"message":"Fetched sport","data":${JSON.stringify(data)}}`);
  } catch (err: any) {
    res.status(500);
    res.setHeader("Content-Type", "application/json");
    return res.send(`{"success":false,"code":500,"message":"Failed to fetch sport","error_detail":"${String(err.message)}"}`);
  }
};
