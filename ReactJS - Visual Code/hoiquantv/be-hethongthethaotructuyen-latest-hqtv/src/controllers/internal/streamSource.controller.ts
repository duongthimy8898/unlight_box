import { Request, Response } from "express";
import { streamSourceService } from "../../services/internal/streamSource.service";

export const getAllStreamSources = async (_req: Request, res: Response) => {
  try {
    const data = await streamSourceService.getAllStreamSources();
    res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched all stream sources",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getStreamSource = async (req: Request, res: Response) => {
  try {
    const id = Number(req.query.value);
    const data = await streamSourceService.getStreamSource(id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "StreamSource not found" });
    }
    res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched stream source",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const createStreamSource = async (req: Request, res: Response) => {
  try {
    const data = await streamSourceService.createStreamSource(req.body);
    res.status(201).json({
      success: true,
      code: 201,
      message: "StreamSource created",
      data,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const updateStreamSource = async (req: Request, res: Response) => {
  try {
    const data = await streamSourceService.updateStreamSource(
      Number(req.params.id),
      req.body
    );
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "StreamSource not found" });
    }
    res.status(200).json({
      success: true,
      code: 200,
      message: "StreamSource updated",
      data,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const deleteStreamSource = async (req: Request, res: Response) => {
  try {
    const result = await streamSourceService.deleteStreamSource(
      Number(req.params.id)
    );
    if (result.affected === 0) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "StreamSource not found" });
    }
    res.status(200).json({
      success: true,
      code: 200,
      message: "StreamSource deleted",
      data: { id: req.params.id },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};
