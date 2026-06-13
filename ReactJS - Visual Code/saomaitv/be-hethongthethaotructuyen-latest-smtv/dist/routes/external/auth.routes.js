"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../../controllers/external/auth.controller");
const express_1 = require("express");
const externalAuthRouter = (0, express_1.Router)();
externalAuthRouter.post("/login", auth_controller_1.externalAuthLogin);
externalAuthRouter.post("/register", auth_controller_1.externalAuthRegister);
exports.default = externalAuthRouter;
