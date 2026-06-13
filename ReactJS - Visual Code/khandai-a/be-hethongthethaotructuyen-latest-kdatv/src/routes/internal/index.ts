import { Router } from "express";
import internalAuthRouter from "./auth.routes";
import internalUserRouter from "./internalUser.routes";
import internalSportRouter from "./sport.routes";
import internalLeagueRouter from "./league.routes";
import internalTeamRouter from "./team.routes";
import internalFixtureRouter from "./fixture.routes";
import internalFixtureCommentatorRouter from "./fixtureCommentators.route";
import internalFixtureStatusRouter from "./fixtureStatus.routes";
import internalFixtureScoreRouter from "./fixtureScore.routes";
import internalStreamSourceRouter from "./streamSource.routes";
import internalReplayRouter from "./replay.routes";

const internalRouter = Router();
internalRouter.use("/auth", internalAuthRouter);
internalRouter.use("/internal-users/", internalUserRouter);
internalRouter.use("/stream-sources/", internalStreamSourceRouter);
internalRouter.use("/sports/", internalSportRouter);
internalRouter.use("/leagues/", internalLeagueRouter);
internalRouter.use("/teams/", internalTeamRouter);
internalRouter.use("/fixtures/", internalFixtureRouter);
internalRouter.use("/fixture-commentators/", internalFixtureCommentatorRouter);
internalRouter.use("/fixture-statuses/", internalFixtureStatusRouter);
internalRouter.use("/fixture-scores/", internalFixtureScoreRouter);
internalRouter.use("/replays/", internalReplayRouter);

export default internalRouter;
