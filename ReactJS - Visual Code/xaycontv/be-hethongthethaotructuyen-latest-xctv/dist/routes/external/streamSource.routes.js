"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const streamSource_controller_1 = require("../../controllers/external/streamSource.controller");
const externalStreamSourceRouter = (0, express_1.Router)();
// Get all
externalStreamSourceRouter.get("/", streamSource_controller_1.getAllStreamSources);
// Get by id (?by=id&value=1) → ở đây chỉ hỗ trợ id
externalStreamSourceRouter.get("/get", streamSource_controller_1.getStreamSource);
exports.default = externalStreamSourceRouter;
