"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../../controllers/external/team.controller");
const externalTeamRouter = (0, express_1.Router)();
externalTeamRouter.get("/", team_controller_1.getAllTeams);
externalTeamRouter.get("/get", team_controller_1.getTeam);
exports.default = externalTeamRouter;
