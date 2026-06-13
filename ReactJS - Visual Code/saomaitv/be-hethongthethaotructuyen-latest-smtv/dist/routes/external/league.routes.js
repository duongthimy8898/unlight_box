"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const league_controller_1 = require("../../controllers/external/league.controller");
const externalLeagueRouter = (0, express_1.Router)();
externalLeagueRouter.get("/", league_controller_1.getAllLeagues);
externalLeagueRouter.get("/get", league_controller_1.getLeague);
exports.default = externalLeagueRouter;
