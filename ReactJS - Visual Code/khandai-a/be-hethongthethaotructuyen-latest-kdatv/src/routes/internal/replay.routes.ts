import { Router } from "express";
import multer from "multer";
import {
  getAllReplays,
  getReplay,
  createReplay,
  updateReplay,
  deleteReplay,
} from "../../controllers/internal/replay.controller";

const upload = multer({ dest: "tmp/" }); // lưu tạm file local

const internalReplayRouter = Router();

internalReplayRouter.get("/", getAllReplays);
internalReplayRouter.get("/get", getReplay);
internalReplayRouter.post(
  "/create",
  upload.fields([
    { name: "file", maxCount: 1 }, // video
    { name: "thumbnail", maxCount: 1 }, // thumbnail
  ]),
  createReplay
);
internalReplayRouter.put("/update/:id", updateReplay);
internalReplayRouter.delete("/delete/:id", deleteReplay);

export default internalReplayRouter;
