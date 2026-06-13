"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/sport.routes.ts
const express_1 = require("express");
const sport_controller_1 = require("../../controllers/external/sport.controller");
const externalSportRouter = (0, express_1.Router)();
// Lấy tất cả
externalSportRouter.get("/", sport_controller_1.getAllSports);
// Lấy 1 bản ghi (query: ?by=id&value=1 hoặc ?by=slug&value=football)
externalSportRouter.get("/get", sport_controller_1.getSport);
exports.default = externalSportRouter;
