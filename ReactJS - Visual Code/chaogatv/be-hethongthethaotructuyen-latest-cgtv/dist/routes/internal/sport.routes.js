"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/sport.routes.ts
const express_1 = require("express");
const sport_controller_1 = require("../../controllers/internal/sport.controller");
const internalSportRouter = (0, express_1.Router)();
// Lấy tất cả
internalSportRouter.get("/", sport_controller_1.getAllSports);
// Tạo mới
internalSportRouter.post("/create", sport_controller_1.createSport);
// Lấy 1 bản ghi (query: ?by=id&value=1 hoặc ?by=slug&value=football)
internalSportRouter.get("/get", sport_controller_1.getSport);
// Cập nhật (body: dữ liệu update, query: ?id=1 hoặc ?slug=football)
internalSportRouter.put("/update/:id", sport_controller_1.updateSport);
// Xóa (query: ?id=1 hoặc ?slug=football)
internalSportRouter.delete("/delete/:id", sport_controller_1.deleteSport);
exports.default = internalSportRouter;
