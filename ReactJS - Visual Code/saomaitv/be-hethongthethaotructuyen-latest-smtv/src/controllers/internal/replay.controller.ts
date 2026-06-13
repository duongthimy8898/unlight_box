import { Request, Response } from "express";
import { replayService } from "../../services/internal/replay.service";
import { uploadToCloudServer } from "../../utils/uploadToCloudServer";

export const getAllReplays = async (req: Request, res: Response) => {
  try {
    const data = await replayService.getAllReplays();
    res
      .status(200)
      .json({ success: true, code: 200, message: "Fetched replays", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const getReplay = async (req: Request, res: Response) => {
  try {
    const { by, value } = req.query as { by: "id" | "slug"; value: string };
    const data = await replayService.getReplay(by, value);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Replay not found" });
    }
    res
      .status(200)
      .json({ success: true, code: 200, message: "Fetched replay", data });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};

export const createReplay = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    if (!files?.file?.[0]) throw new Error("No video uploaded");
    if (!files?.thumbnail?.[0]) throw new Error("No thumbnail uploaded");

    // Upload sang server upload
    // Upload video
    const thumbnailUrl = await uploadToCloudServer(files.thumbnail[0]);
    if (!thumbnailUrl) throw new Error("Upload thumbnail failed");

    const videoSourceUrl = await uploadToCloudServer(files.file[0]);
    if (!videoSourceUrl) throw new Error("Upload video failed");
    
    console.log("Uploaded URLs:", { videoSourceUrl, thumbnailUrl });
    const payload = {
      ...req.body,
      thumbnailUrl,
      videoSourceUrl,
    };
    const data = await replayService.createReplay(payload);
    res
      .status(201)
      .json({ success: true, code: 201, message: "Replay created", data });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const updateReplay = async (req: Request, res: Response) => {
  try {
    const data = await replayService.updateReplay(
      Number(req.params.id),
      req.body
    );
    if (!data) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Replay not found" });
    }
    res
      .status(200)
      .json({ success: true, code: 200, message: "Replay updated", data });
  } catch (err: any) {
    res.status(400).json({ success: false, code: 400, message: err.message });
  }
};

export const deleteReplay = async (req: Request, res: Response) => {
  try {
    const result = await replayService.deleteReplay(Number(req.params.id));
    if (result.affected === 0) {
      return res
        .status(404)
        .json({ success: false, code: 404, message: "Replay not found" });
    }
    res.status(200).json({
      success: true,
      code: 200,
      message: "Replay deleted",
      data: { id: req.params.id },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, code: 500, message: err.message });
  }
};
