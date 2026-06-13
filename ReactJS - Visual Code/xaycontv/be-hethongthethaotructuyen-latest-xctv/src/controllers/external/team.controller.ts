import { Request, Response } from "express";
import { teamService } from "../../services/external/team.service";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const data = await teamService.getAllTeams();
    res
      .status(200)
      .json({ success: true, code: 200, message: "Fetched teams", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: "id" | "slug"; value: string };
    const data = await teamService.getTeam(by, value);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Team not found" });
    }
    res
      .status(200)
      .json({ success: true, code: 200, message: "Fetched team", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};