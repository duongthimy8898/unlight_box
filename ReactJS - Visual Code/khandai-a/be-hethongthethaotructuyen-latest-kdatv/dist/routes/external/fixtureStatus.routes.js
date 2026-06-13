"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fixtureStatus_controller_1 = require("../../controllers/external/fixtureStatus.controller");
const externalFixtureStatusRouter = (0, express_1.Router)();
// Get all
externalFixtureStatusRouter.get("/", fixtureStatus_controller_1.getAllFixtureStatuses);
// Get by id (?by=id&value=...)
externalFixtureStatusRouter.get("/get", fixtureStatus_controller_1.getFixtureStatus);
exports.default = externalFixtureStatusRouter;
