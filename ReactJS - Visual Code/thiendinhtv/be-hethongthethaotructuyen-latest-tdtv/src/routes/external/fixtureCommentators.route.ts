import { Router } from "express";
import {
  getFixtureCommentators,
} from "../../controllers/external/fixtureCommentators.controller";

const externalFixtureCommentatorRouter = Router();

// Lấy tất cả commentators của 1 fixture
externalFixtureCommentatorRouter.get("/:fixtureId", getFixtureCommentators);


export default externalFixtureCommentatorRouter;
