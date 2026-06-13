"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStreamSource = exports.updateStreamSource = exports.createStreamSource = exports.getStreamSource = exports.getAllStreamSources = void 0;
const streamSource_service_1 = require("../../services/internal/streamSource.service");
const getAllStreamSources = async (_req, res) => {
    try {
        const data = await streamSource_service_1.streamSourceService.getAllStreamSources();
        res.status(200).json({
            success: true,
            code: 200,
            message: "Fetched all stream sources",
            data,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllStreamSources = getAllStreamSources;
const getStreamSource = async (req, res) => {
    try {
        const id = Number(req.query.value);
        const data = await streamSource_service_1.streamSourceService.getStreamSource(id);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "StreamSource not found" });
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: "Fetched stream source",
            data,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getStreamSource = getStreamSource;
const createStreamSource = async (req, res) => {
    try {
        const data = await streamSource_service_1.streamSourceService.createStreamSource(req.body);
        res.status(201).json({
            success: true,
            code: 201,
            message: "StreamSource created",
            data,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.createStreamSource = createStreamSource;
const updateStreamSource = async (req, res) => {
    try {
        const data = await streamSource_service_1.streamSourceService.updateStreamSource(Number(req.params.id), req.body);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "StreamSource not found" });
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: "StreamSource updated",
            data,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.updateStreamSource = updateStreamSource;
const deleteStreamSource = async (req, res) => {
    try {
        const result = await streamSource_service_1.streamSourceService.deleteStreamSource(Number(req.params.id));
        if (result.affected === 0) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "StreamSource not found" });
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: "StreamSource deleted",
            data: { id: req.params.id },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.deleteStreamSource = deleteStreamSource;
