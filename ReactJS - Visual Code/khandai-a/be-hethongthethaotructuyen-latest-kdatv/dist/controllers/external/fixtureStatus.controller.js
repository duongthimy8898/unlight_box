"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFixtureStatus = exports.getAllFixtureStatuses = void 0;
const fixtureStatus_service_1 = require("../../services/external/fixtureStatus.service");
const getAllFixtureStatuses = async (req, res) => {
    try {
        const data = await fixtureStatus_service_1.fixtureStatusService.getAllFixtureStatuses();
        res.status(200).json({
            success: true,
            code: 200,
            message: "Fetched fixture statuses",
            data,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllFixtureStatuses = getAllFixtureStatuses;
const getFixtureStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await fixtureStatus_service_1.fixtureStatusService.getFixtureStatus(id);
        if (!data) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "FixtureStatus not found",
            });
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: "Fetched fixture status",
            data,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getFixtureStatus = getFixtureStatus;
