"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fixtureScore_controller_1 = require("../../controllers/internal/fixtureScore.controller");
const internalFixtureScoreRouter = (0, express_1.Router)();
// Get all
internalFixtureScoreRouter.get("/", fixtureScore_controller_1.getAllFixtureScores);
// Get by id (?by=id&value=1)
internalFixtureScoreRouter.get("/get", fixtureScore_controller_1.getFixtureScore);
// Create
internalFixtureScoreRouter.post("/create", fixtureScore_controller_1.createFixtureScore);
// Update
internalFixtureScoreRouter.put("/update/:id", fixtureScore_controller_1.updateFixtureScore);
// Delete
internalFixtureScoreRouter.delete("/delete/:id", fixtureScore_controller_1.deleteFixtureScore);
exports.default = internalFixtureScoreRouter;
