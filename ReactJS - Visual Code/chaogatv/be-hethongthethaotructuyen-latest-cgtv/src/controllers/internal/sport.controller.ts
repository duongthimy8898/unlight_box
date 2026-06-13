import { Request, Response } from "express";
import { sportService } from "../../services/internal/sport.service";

export const getAllSports = async (req: Request, res: Response) => {
  try {
    const data = await sportService.getAllSports();
    res
      .status(200)
      .json({ success: true, code: 200, message: "Fetched sports", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getSport = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: "id" | "slug"; value: string };
    const data = await sportService.getSport(by, value);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Sport not found" });
    }
    res
      .status(200)
      .json({ success: true, code: 200, message: "Fetched sport", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const createSport = async (req: Request, res: Response) => {
  try {
    const data = await sportService.createSport(req.body);
    res
      .status(201)
      .json({ success: true, code: 201, message: "Sport created", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const updateSport = async (req: Request, res: Response) => {
  try {
    const data = await sportService.updateSport(
      Number(req.params.id),
      req.body
    );
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Sport not found" });
    }
    res
      .status(200)
      .json({ success: true, code: 200, message: "Sport updated", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const deleteSport = async (req: Request, res: Response) => {
  try {
    const result = await sportService.deleteSport(Number(req.params.id));
    if (result.affected === 0) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Sport not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        code: 200,
        message: "Sport deleted",
        data: { id: req.params.id },
      });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};
