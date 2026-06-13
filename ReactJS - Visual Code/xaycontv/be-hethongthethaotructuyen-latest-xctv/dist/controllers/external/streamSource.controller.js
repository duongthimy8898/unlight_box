"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreamSource = exports.getAllStreamSources = void 0;
const streamSource_service_1 = require("../../services/external/streamSource.service");
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
