"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const replay_controller_1 = require("../../controllers/internal/replay.controller");
const upload = (0, multer_1.default)({ dest: "tmp/" }); // lưu tạm file local
const internalReplayRouter = (0, express_1.Router)();
internalReplayRouter.get("/", replay_controller_1.getAllReplays);
internalReplayRouter.get("/get", replay_controller_1.getReplay);
internalReplayRouter.post("/create", upload.fields([
    { name: "file", maxCount: 1 }, // video
    { name: "thumbnail", maxCount: 1 }, // thumbnail
]), replay_controller_1.createReplay);
internalReplayRouter.put("/update/:id", replay_controller_1.updateReplay);
internalReplayRouter.delete("/delete/:id", replay_controller_1.deleteReplay);
exports.default = internalReplayRouter;
