"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fixtureScore_controller_1 = require("../../controllers/external/fixtureScore.controller");
const externalFixtureScoreRouter = (0, express_1.Router)();
// Get all
externalFixtureScoreRouter.get("/", fixtureScore_controller_1.getAllFixtureScores);
// Get by id (?by=id&value=1)
externalFixtureScoreRouter.get("/get", fixtureScore_controller_1.getFixtureScore);
exports.default = externalFixtureScoreRouter;
