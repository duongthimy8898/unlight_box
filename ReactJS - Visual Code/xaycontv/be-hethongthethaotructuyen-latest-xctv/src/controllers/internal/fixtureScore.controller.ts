import { Request, Response } from "express";
import { fixtureScoreService } from "../../services/internal/fixtureScore.service";

export const getAllFixtureScores = async (_req: Request, res: Response) => {
  try {
    const data = await fixtureScoreService.getAllFixtureScores();
    res.status(200).json({ success: true, code: 200, message: "Fetched all fixture scores", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getFixtureScore = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await fixtureScoreService.getFixtureScore(id);
    if (!data) {
      return res.status(404).json({ success: false, code: 404, message: "FixtureScore not found" });
    }
    res.status(200).json({ success: true, code: 200, message: "Fetched fixture score", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const createFixtureScore = async (req: Request, res: Response) => {
  try {
    const data = await fixtureScoreService.createFixtureScore(req.body);
    res.status(201).json({ success: true, code: 201, message: "FixtureScore created", data });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const updateFixtureScore = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await fixtureScoreService.updateFixtureScore(id, req.body);
    if (!data) {
      return res.status(404).json({ success: false, code: 404, message: "FixtureScore not found" });
    }
    res.status(200).json({ success: true, code: 200, message: "FixtureScore updated", data });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const deleteFixtureScore = async (req: Request, res: Response) => {
  try {
    const result = await fixtureScoreService.deleteFixtureScore(Number(req.params.id));
    if (result.affected === 0) {
      return res.status(404).json({ success: false, code: 404, message: "FixtureScore not found" });
    }
    res.status(200).json({ success: true, code: 200, message: "FixtureScore deleted", data: { id: req.params.id } });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};
