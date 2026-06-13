"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReplay = exports.updateReplay = exports.createReplay = exports.getReplay = exports.getAllReplays = void 0;
const replay_service_1 = require("../../services/internal/replay.service");
const uploadToCloudServer_1 = require("../../utils/uploadToCloudServer");
const getAllReplays = async (req, res) => {
    try {
        const data = await replay_service_1.replayService.getAllReplays();
        res
            .status(200)
            .json({ success: true, code: 200, message: "Fetched replays", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllReplays = getAllReplays;
const getReplay = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await replay_service_1.replayService.getReplay(by, value);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Replay not found" });
        }
        res
            .status(200)
            .json({ success: true, code: 200, message: "Fetched replay", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getReplay = getReplay;
const createReplay = async (req, res) => {
    try {
        const files = req.files;
        if (!files?.file?.[0])
            throw new Error("No video uploaded");
        if (!files?.thumbnail?.[0])
            throw new Error("No thumbnail uploaded");
        // Upload sang server upload
        // Upload video
        const thumbnailUrl = await (0, uploadToCloudServer_1.uploadToCloudServer)(files.thumbnail[0]);
        if (!thumbnailUrl)
            throw new Error("Upload thumbnail failed");
        const videoSourceUrl = await (0, uploadToCloudServer_1.uploadToCloudServer)(files.file[0]);
        if (!videoSourceUrl)
            throw new Error("Upload video failed");
        console.log("Uploaded URLs:", { videoSourceUrl, thumbnailUrl });
        const payload = {
            ...req.body,
            thumbnailUrl,
            videoSourceUrl,
        };
        const data = await replay_service_1.replayService.createReplay(payload);
        res
            .status(201)
            .json({ success: true, code: 201, message: "Replay created", data });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.createReplay = createReplay;
const updateReplay = async (req, res) => {
    try {
        const data = await replay_service_1.replayService.updateReplay(Number(req.params.id), req.body);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Replay not found" });
        }
        res
            .status(200)
            .json({ success: true, code: 200, message: "Replay updated", data });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.updateReplay = updateReplay;
const deleteReplay = async (req, res) => {
    try {
        const result = await replay_service_1.replayService.deleteReplay(Number(req.params.id));
        if (result.affected === 0) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Replay not found" });
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: "Replay deleted",
            data: { id: req.params.id },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.deleteReplay = deleteReplay;
