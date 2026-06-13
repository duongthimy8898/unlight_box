import { Router } from "express";
import {
  getAllFixtureStatuses,
  getFixtureStatus,
} from "../../controllers/external/fixtureStatus.controller";

const externalFixtureStatusRouter = Router();

// Get all
externalFixtureStatusRouter.get("/", getAllFixtureStatuses);

// Get by id (?by=id&value=...)
externalFixtureStatusRouter.get("/get", getFixtureStatus);

export default externalFixtureStatusRouter;
