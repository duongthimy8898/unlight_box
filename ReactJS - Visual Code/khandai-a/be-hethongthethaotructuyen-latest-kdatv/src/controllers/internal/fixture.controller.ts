import { Request, Response } from "express";
import { fixtureService } from "../../services/internal/fixture.service";

/**
 * GET all fixtures
 */
export const getAllFixtures = async (req: Request, res: Response) => {
  try {
    const data = await fixtureService.getAllFixtures();
    return res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched all fixtures successfully",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to fetch fixtures",
      error_detail: err.message,
    });
  }
};

/**
 * GET fixture by id | slug
 */
export const getFixture = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: "id" | "slug"; value: string };
    const data = await fixtureService.getFixture(by, value);

    if (!data) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Fixture not found",
        error_detail: { by, value },
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched fixture successfully",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to fetch fixture",
      error_detail: err.message,
    });
  }
};

/**
 * CREATE fixture
 */
export const createFixture = async (req: Request, res: Response) => {
  try {
    const saved = await fixtureService.createFixture(req.body);
    return res.status(201).json({
      success: true,
      code: 201,
      message: "Fixture created successfully",
      data: saved,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Failed to create fixture",
      error_detail: err.message,
    });
  }
};

/**
 * UPDATE fixture
 */
export const updateFixture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const saved = await fixtureService.updateFixture(Number(id), req.body);

    if (!saved) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Fixture not found",
        error_detail: { id },
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Fixture updated successfully",
      data: saved,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Failed to update fixture",
      error_detail: err.message,
    });
  }
};

/**
 * UPDATE fixture acts (pin, hot, live, ...)
 */
export const acts = async (req: Request, res: Response) => {
  try {
    const id = Number(req.query.id);
    const act = String(req.query.act);

    if (!["pin", "unpin", "hot", "unhot", "live", "unlive"].includes(act)) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Invalid act",
        error_detail: { act },
      });
    }

    const saved = await fixtureService.updateAct(id, act);
    if (!saved) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Fixture not found",
        error_detail: { id },
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Fixture act updated successfully",
      data: saved,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed",
      error_detail: err.message,
    });
  }
};

/**
 * Mark fixture as done (Full Time)
 */
export const doneFixture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const saved = await fixtureService.doneFixture(Number(id));

    if (!saved) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Fixture not found",
        error_detail: { id },
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Fixture done successfully",
      data: saved,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to done fixture",
      error_detail: err.message,
    });
  }
};

/**
 * DELETE fixture
 */
export const deleteFixture = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await fixtureService.deleteFixture(id);

    if (result.affected === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Fixture not found",
        error_detail: { id },
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: "Fixture deleted successfully",
      data: { id },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Failed to delete fixture",
      error_detail: err.message,
    });
  }
};
