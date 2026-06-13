import { Router } from "express";
import {
  getAllFixtureScores,
  getFixtureScore,
} from "../../controllers/external/fixtureScore.controller";

const externalFixtureScoreRouter = Router();

// Get all
externalFixtureScoreRouter.get("/", getAllFixtureScores);

// Get by id (?by=id&value=1)
externalFixtureScoreRouter.get("/get", getFixtureScore);


export default externalFixtureScoreRouter;
