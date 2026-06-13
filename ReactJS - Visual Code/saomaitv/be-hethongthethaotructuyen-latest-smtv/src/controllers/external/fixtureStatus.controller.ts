import { Request, Response } from "express";
import { fixtureStatusService } from "../../services/external/fixtureStatus.service";

export const getAllFixtureStatuses = async (req: Request, res: Response) => {
  try {
    const data = await fixtureStatusService.getAllFixtureStatuses();
    res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched fixture statuses",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getFixtureStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await fixtureStatusService.getFixtureStatus(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "FixtureStatus not found",
      });
    }
    res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched fixture status",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};
