import { Request, Response } from "express";
import { streamSourceService } from "../../services/external/streamSource.service";

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
