import { Router } from "express";
import {
  getAllStreamSources,
  getStreamSource,
  createStreamSource,
  updateStreamSource,
  deleteStreamSource,
} from "../../controllers/internal/streamSource.controller";

const internalStreamSourceRouter = Router();

// Get all
internalStreamSourceRouter.get("/", getAllStreamSources);

// Get by id (?by=id&value=1) → ở đây chỉ hỗ trợ id
internalStreamSourceRouter.get("/get", getStreamSource);

// Create
internalStreamSourceRouter.post("/create", createStreamSource);

// Update
internalStreamSourceRouter.put("/update/:id", updateStreamSource);

// Delete
internalStreamSourceRouter.delete("/delete/:id", deleteStreamSource);

export default internalStreamSourceRouter;
