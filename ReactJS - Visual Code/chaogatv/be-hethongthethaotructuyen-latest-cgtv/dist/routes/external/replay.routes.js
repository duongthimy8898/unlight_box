"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const replay_controller_1 = require("../../controllers/external/replay.controller");
const externalReplayRouter = (0, express_1.Router)();
externalReplayRouter.get("/", replay_controller_1.getAllReplays);
externalReplayRouter.get("/get", replay_controller_1.getReplay);
exports.default = externalReplayRouter;
