"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fixtureCommentators_controller_1 = require("../../controllers/external/fixtureCommentators.controller");
const externalFixtureCommentatorRouter = (0, express_1.Router)();
// Lấy tất cả commentators của 1 fixture
externalFixtureCommentatorRouter.get("/:fixtureId", fixtureCommentators_controller_1.getFixtureCommentators);
exports.default = externalFixtureCommentatorRouter;
