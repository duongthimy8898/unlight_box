import { Router } from "express";
import multer from "multer";
import { UploadController } from "../controllers/upload.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("video"), UploadController.upload);

export default router;