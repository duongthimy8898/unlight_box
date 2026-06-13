import { Router } from "express";
import {
  getAllReplays,
  getReplay,
} from "../../controllers/external/replay.controller";


const externalReplayRouter = Router();

externalReplayRouter.get("/", getAllReplays);
externalReplayRouter.get("/get", getReplay);

export default externalReplayRouter;
