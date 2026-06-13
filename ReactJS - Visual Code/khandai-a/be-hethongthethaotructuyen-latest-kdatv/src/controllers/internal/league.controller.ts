import { Request, Response } from "express";
import { leagueService } from "../../services/internal/league.service";

export const getAllLeagues = async (req: Request, res: Response) => {
  try {
    const data = await leagueService.getAllLeagues();
    res
      .status(200)
      .json({ success: true, code: 200, message: "Fetched leagues", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getLeague = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as {
      by: "id" | "slug" | "name" | "referenceId";
      value: string;
    };
    const data = await leagueService.getLeague(by, value);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "League not found" });
    }
    res
      .status(200)
      .json({ success: true, code: 200, message: "Fetched league", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const createLeague = async (req: Request, res: Response) => {
  try {
    const data = await leagueService.createLeague(req.body);
    res
      .status(201)
      .json({ success: true, code: 201, message: "League created", data });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const updateLeague = async (req: Request, res: Response) => {
  try {
    const data = await leagueService.updateLeague(
      Number(req.params.id),
      req.body
    );
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "League not found" });
    }
    res
      .status(200)
      .json({ success: true, code: 200, message: "League updated", data });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const deleteLeague = async (req: Request, res: Response) => {
  try {
    const result = await leagueService.deleteLeague(Number(req.params.id));
    if (result.affected === 0) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "League not found" });
    }
    res.status(200).json({
      success: true,
      code: 200,
      message: "League deleted",
      data: { id: req.params.id },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};
