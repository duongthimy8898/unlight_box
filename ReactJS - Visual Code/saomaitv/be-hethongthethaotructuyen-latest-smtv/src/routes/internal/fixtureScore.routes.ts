import { Router } from "express";
import {
  getAllFixtureScores,
  getFixtureScore,
  createFixtureScore,
  updateFixtureScore,
  deleteFixtureScore,
} from "../../controllers/internal/fixtureScore.controller";

const internalFixtureScoreRouter = Router();

// Get all
internalFixtureScoreRouter.get("/", getAllFixtureScores);

// Get by id (?by=id&value=1)
internalFixtureScoreRouter.get("/get", getFixtureScore);

// Create
internalFixtureScoreRouter.post("/create", createFixtureScore);

// Update
internalFixtureScoreRouter.put("/update/:id", updateFixtureScore);

// Delete
internalFixtureScoreRouter.delete("/delete/:id", deleteFixtureScore);

export default internalFixtureScoreRouter;
