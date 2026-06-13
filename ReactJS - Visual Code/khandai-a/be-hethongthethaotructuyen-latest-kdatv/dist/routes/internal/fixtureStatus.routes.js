"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fixtureStatus_controller_1 = require("../../controllers/internal/fixtureStatus.controller");
const internalFixtureStatusRouter = (0, express_1.Router)();
// Get all
internalFixtureStatusRouter.get("/", fixtureStatus_controller_1.getAllFixtureStatuses);
// Get by id (?by=id&value=...)
internalFixtureStatusRouter.get("/get", fixtureStatus_controller_1.getFixtureStatus);
// Create
internalFixtureStatusRouter.post("/create", fixtureStatus_controller_1.createFixtureStatus);
// Update
internalFixtureStatusRouter.put("/update/:id", fixtureStatus_controller_1.updateFixtureStatus);
// Delete
internalFixtureStatusRouter.delete("/delete/:id", fixtureStatus_controller_1.deleteFixtureStatus);
exports.default = internalFixtureStatusRouter;
