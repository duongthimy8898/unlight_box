// controllers/fixtureCommentator.controller.ts
import { Request, Response } from "express";
import { fixtureCommentatorService } from "../../services/internal/fixtureCommentators.service";

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

export const addFixtureCommentator = async (req: Request, res: Response) => {
  try {
    const fixtureId = parseInt(req.params.fixtureId, 10);
    const { commentatorId, priority } = req.body;
    const saved = await fixtureCommentatorService.addFixtureCommentator(
      fixtureId,
      commentatorId,
      priority
    );

    return res.status(201).json({
      success: true,
      code: 201,
      message: "Commentator added successfully",
      data: saved,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to add commentator",
      error_detail: err.message,
    });
  }
};

export const updateFixtureCommentator = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await fixtureCommentatorService.updateFixtureCommentator(
      id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "FixtureCommentator not found",
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "FixtureCommentator updated successfully",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to update fixture commentator",
      error_detail: err.message,
    });
  }
};

export const deleteFixtureCommentator = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await fixtureCommentatorService.deleteFixtureCommentator(id);

    if (!result || result.affected === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "FixtureCommentator not found",
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "FixtureCommentator deleted successfully",
      data: { id },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to delete fixture commentator",
      error_detail: err.message,
    });
  }
};
