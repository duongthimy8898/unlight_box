"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const streamSource_controller_1 = require("../../controllers/internal/streamSource.controller");
const internalStreamSourceRouter = (0, express_1.Router)();
// Get all
internalStreamSourceRouter.get("/", streamSource_controller_1.getAllStreamSources);
// Get by id (?by=id&value=1) → ở đây chỉ hỗ trợ id
internalStreamSourceRouter.get("/get", streamSource_controller_1.getStreamSource);
// Create
internalStreamSourceRouter.post("/create", streamSource_controller_1.createStreamSource);
// Update
internalStreamSourceRouter.put("/update/:id", streamSource_controller_1.updateStreamSource);
// Delete
internalStreamSourceRouter.delete("/delete/:id", streamSource_controller_1.deleteStreamSource);
exports.default = internalStreamSourceRouter;
