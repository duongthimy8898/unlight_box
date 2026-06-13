import { Router } from "express";
// import externalAuthRouter from "./auth.routes";
import externalSportRouter from "./sport.routes";
import externalLeagueRouter from "./league.routes";
import externalTeamRouter from "./team.routes";
import externalFixtureRouter from "./fixture.routes";
import externalFixtureCommentatorRouter from "./fixtureCommentators.route";
import externalFixtureStatusRouter from "./fixtureStatus.routes";
import externalFixtureScoreRouter from "./fixtureScore.routes";
import externalStreamSourceRouter from "./streamSource.routes";
import externalReplayRouter from "./replay.routes";
import externalAuthRouter from "./auth.routes";

const externalRouter = Router();
externalRouter.use("/auth", externalAuthRouter);
externalRouter.use("/stream-sources/", externalStreamSourceRouter);
externalRouter.use("/sports/", externalSportRouter);
externalRouter.use("/leagues/", externalLeagueRouter);
externalRouter.use("/teams/", externalTeamRouter);
externalRouter.use("/fixtures/", externalFixtureRouter);
externalRouter.use("/fixture-commentators/", externalFixtureCommentatorRouter);
externalRouter.use("/fixture-statuses/", externalFixtureStatusRouter);
externalRouter.use("/fixture-scores/", externalFixtureScoreRouter);
externalRouter.use("/replays/", externalReplayRouter);

export default externalRouter;
