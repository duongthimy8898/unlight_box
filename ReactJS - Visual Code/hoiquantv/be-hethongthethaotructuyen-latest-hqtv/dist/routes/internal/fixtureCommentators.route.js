"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fixtureCommentators_controller_1 = require("../../controllers/internal/fixtureCommentators.controller");
const internalFixtureCommentatorRouter = (0, express_1.Router)();
// Lấy tất cả commentators của 1 fixture
internalFixtureCommentatorRouter.get("/:fixtureId", fixtureCommentators_controller_1.getFixtureCommentators);
// Thêm commentator vào fixture
internalFixtureCommentatorRouter.post("/:fixtureId/add", fixtureCommentators_controller_1.addFixtureCommentator);
// Cập nhật priority hoặc thông tin mapping
internalFixtureCommentatorRouter.put("/update/:id", fixtureCommentators_controller_1.updateFixtureCommentator);
// Xóa commentator khỏi fixture
internalFixtureCommentatorRouter.delete("/delete/:id", fixtureCommentators_controller_1.deleteFixtureCommentator);
exports.default = internalFixtureCommentatorRouter;
