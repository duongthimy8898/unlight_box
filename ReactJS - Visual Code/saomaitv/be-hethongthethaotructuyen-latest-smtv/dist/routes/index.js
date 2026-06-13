"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const internal_1 = __importDefault(require("./internal"));
const external_1 = __importDefault(require("./external"));
const router = (0, express_1.Router)();
// mount từng nhóm route
router.use("/internal", internal_1.default);
router.use("/external", external_1.default);
// router.use("/external/auth", externalAuthRoutes);
exports.default = router;
