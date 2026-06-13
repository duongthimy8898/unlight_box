import { Router } from "express";
import { getAllFixtures, getUnfinishedFixtures, getFinishedFixtures, getFixture } from "../../controllers/external/fixture.controller";

const externalFixtureRouter = Router();

// externalFixtureRouter.get("/", getAllFixtures);
externalFixtureRouter.get("/unfinished", getUnfinishedFixtures);
externalFixtureRouter.get("/finished", getFinishedFixtures);
externalFixtureRouter.get("/get", getFixture);

export default externalFixtureRouter;
