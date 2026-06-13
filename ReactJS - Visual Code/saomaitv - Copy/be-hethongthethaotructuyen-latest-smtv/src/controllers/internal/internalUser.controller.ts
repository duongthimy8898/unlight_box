import { Request, Response } from "express";
import { internalUserService } from "../../services/internal/internalUser.service";

export const getAllInternalUsers = async (_req: Request, res: Response) => {
  try {
    const data = await internalUserService.getAll();
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "Fetched all internal users",
        data,
      });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getAllInternalUsersBy = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: string; value: string };
    const data = await internalUserService.getAllBy(by, value);
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "Fetched internal users by filter",
        data,
      });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getInternalUser = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: string; value: string };
    const data = await internalUserService.getOne(by, value);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "InternalUser not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "Fetched internal user",
        data,
      });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const createInternalUser = async (req: Request, res: Response) => {
  try {
    const data = await internalUserService.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        code: 201,
        message: "InternalUser created",
        data,
      });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const updateInternalUser = async (req: Request, res: Response) => {
  try {
    const data = await internalUserService.update(
      Number(req.params.id),
      req.body
    );
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "InternalUser not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "InternalUser updated",
        data,
      });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const deleteInternalUser = async (req: Request, res: Response) => {
  try {
    const result = await internalUserService.delete(Number(req.params.id));
    if (result.affected === 0) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "InternalUser not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "InternalUser deleted",
        data: { id: req.params.id },
      });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};
