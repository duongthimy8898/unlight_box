import { Router } from "express";
import {
  getAllStreamSources,
  getStreamSource,
} from "../../controllers/external/streamSource.controller";

const externalStreamSourceRouter = Router();

// Get all
externalStreamSourceRouter.get("/", getAllStreamSources);

// Get by id (?by=id&value=1) → ở đây chỉ hỗ trợ id
externalStreamSourceRouter.get("/get", getStreamSource);

export default externalStreamSourceRouter;
