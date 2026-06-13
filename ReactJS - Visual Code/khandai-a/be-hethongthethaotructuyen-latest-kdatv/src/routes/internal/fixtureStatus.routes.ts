import { Router } from "express";
import {
  getAllFixtureStatuses,
  getFixtureStatus,
  createFixtureStatus,
  updateFixtureStatus,
  deleteFixtureStatus,
} from "../../controllers/internal/fixtureStatus.controller";

const internalFixtureStatusRouter = Router();

// Get all
internalFixtureStatusRouter.get("/", getAllFixtureStatuses);

// Get by id (?by=id&value=...)
internalFixtureStatusRouter.get("/get", getFixtureStatus);

// Create
internalFixtureStatusRouter.post("/create", createFixtureStatus);

// Update
internalFixtureStatusRouter.put("/update/:id", updateFixtureStatus);

// Delete
internalFixtureStatusRouter.delete("/delete/:id", deleteFixtureStatus);

export default internalFixtureStatusRouter;
