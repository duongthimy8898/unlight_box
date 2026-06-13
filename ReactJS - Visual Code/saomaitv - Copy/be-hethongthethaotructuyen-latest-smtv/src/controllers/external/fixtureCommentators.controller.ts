// controllers/fixtureCommentator.controller.ts
import { Request, Response } from "express";
import { fixtureCommentatorService } from "../../services/external/fixtureCommentators.service";

export const getAllFixtureCommentators = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await fixtureCommentatorService.getAllFixtureCommentators();
    return res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched all fixture commentators successfully",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to fetch fixture commentators",
      error_detail: err.message,
    });
  }
};

export const getFixtureCommentators = async (req: Request, res: Response) => {
  try {
    const fixtureId = parseInt(req.params.fixtureId, 10);
    const data = await fixtureCommentatorService.getFixtureCommentators(
      fixtureId
    );

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched fixture commentators successfully",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to fetch fixture commentators",
      error_detail: err.message,
    });
  }
};
