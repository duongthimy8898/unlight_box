"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureStatus = exports.updateFixtureStatus = exports.createFixtureStatus = exports.getFixtureStatus = exports.getAllFixtureStatuses = void 0;
const fixtureStatus_service_1 = require("../../services/internal/fixtureStatus.service");
const getAllFixtureStatuses = async (req, res) => {
    try {
        const data = await fixtureStatus_service_1.fixtureStatusService.getAllFixtureStatuses();
        res
            .status(200)
            .json({
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
            return res
                .status(404)
                .json({
                success: false,
                code: 404,
                message: "FixtureStatus not found",
            });
        }
        res
            .status(200)
            .json({
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
const createFixtureStatus = async (req, res) => {
    try {
        const data = await fixtureStatus_service_1.fixtureStatusService.createFixtureStatus(req.body);
        res
            .status(201)
            .json({
            success: true,
            code: 201,
            message: "FixtureStatus created",
            data,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.createFixtureStatus = createFixtureStatus;
const updateFixtureStatus = async (req, res) => {
    try {
        const data = await fixtureStatus_service_1.fixtureStatusService.updateFixtureStatus(Number(req.params.id), req.body);
        if (!data) {
            return res
                .status(404)
                .json({
                success: false,
                code: 404,
                message: "FixtureStatus not found",
            });
        }
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "FixtureStatus updated",
            data,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.updateFixtureStatus = updateFixtureStatus;
const deleteFixtureStatus = async (req, res) => {
    try {
        const result = await fixtureStatus_service_1.fixtureStatusService.deleteFixtureStatus(Number(req.params.id));
        if (result.affected === 0) {
            return res
                .status(404)
                .json({
                success: false,
                code: 404,
                message: "FixtureStatus not found",
            });
        }
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "FixtureStatus deleted",
            data: { id: req.params.id },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.deleteFixtureStatus = deleteFixtureStatus;
