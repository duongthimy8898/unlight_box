"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../../controllers/internal/auth.controller");
const auth_middleware_1 = require("../../middlewares/internal/auth.middleware");
const InternalUser_entity_1 = require("../../entities/InternalUser.entity");
const express_1 = require("express");
const internalAuthRouter = (0, express_1.Router)();
internalAuthRouter.post("/login", auth_controller_1.internalAuthLogin);
// Ví dụ route bảo vệ: chỉ ADMINISTRATOR mới vào được
internalAuthRouter.get("/admin-only", auth_middleware_1.internalAuthMiddleware, (0, auth_middleware_1.internalCheckRole)([InternalUser_entity_1.InternalUserRole.ADMINISTRATOR]), (req, res) => {
    res.json({ message: "Welcome Admin" });
});
exports.default = internalAuthRouter;
