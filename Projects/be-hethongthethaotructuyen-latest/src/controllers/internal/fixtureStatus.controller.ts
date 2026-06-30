import { Request, Response } from "express";
import { fixtureStatusService } from "../../services/internal/fixtureStatus.service";

export const getAllFixtureStatuses = async (req: Request, res: Response) => {
  try {
    const data = await fixtureStatusService.getAllFixtureStatuses();
    res
      .status(200)
      .json({
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
      return res
        .status(404)
        .json({
          success: false,
          code: 404,
          message: "FixtureStatus not found",
        });
    }
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "Fetched fixture status",
        data,
      });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const createFixtureStatus = async (req: Request, res: Response) => {
  try {
    const data = await fixtureStatusService.createFixtureStatus(req.body);
    res
      .status(201)
      .json({
        success: true,
        code: 201,
        message: "FixtureStatus created",
        data,
      });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const updateFixtureStatus = async (req: Request, res: Response) => {
  try {
    const data = await fixtureStatusService.updateFixtureStatus(
      Number(req.params.id),
      req.body
    );
    if (!data) {
      return res
        .status(404)
        .json({
          success: false,
          code: 404,
          message: "FixtureStatus not found",
        });
    }
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "FixtureStatus updated",
        data,
      });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const deleteFixtureStatus = async (req: Request, res: Response) => {
  try {
    const result = await fixtureStatusService.deleteFixtureStatus(
      Number(req.params.id)
    );
    if (result.affected === 0) {
      return res
        .status(404)
        .json({
          success: false,
          code: 404,
          message: "FixtureStatus not found",
        });
    }
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "FixtureStatus deleted",
        data: { id: req.params.id },
      });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};
