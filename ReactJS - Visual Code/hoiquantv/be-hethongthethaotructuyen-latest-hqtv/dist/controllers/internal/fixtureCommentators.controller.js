"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureCommentator = exports.updateFixtureCommentator = exports.addFixtureCommentator = exports.getFixtureCommentators = exports.getAllFixtureCommentators = void 0;
const fixtureCommentators_service_1 = require("../../services/internal/fixtureCommentators.service");
const getAllFixtureCommentators = async (_req, res) => {
    try {
        const data = await fixtureCommentators_service_1.fixtureCommentatorService.getAllFixtureCommentators();
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Fetched all fixture commentators successfully",
            data,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to fetch fixture commentators",
            error_detail: err.message,
        });
    }
};
exports.getAllFixtureCommentators = getAllFixtureCommentators;
const getFixtureCommentators = async (req, res) => {
    try {
        const fixtureId = parseInt(req.params.fixtureId, 10);
        const data = await fixtureCommentators_service_1.fixtureCommentatorService.getFixtureCommentators(fixtureId);
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Fetched fixture commentators successfully",
            data,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to fetch fixture commentators",
            error_detail: err.message,
        });
    }
};
exports.getFixtureCommentators = getFixtureCommentators;
const addFixtureCommentator = async (req, res) => {
    try {
        const fixtureId = parseInt(req.params.fixtureId, 10);
        const { commentatorId, priority } = req.body;
        const saved = await fixtureCommentators_service_1.fixtureCommentatorService.addFixtureCommentator(fixtureId, commentatorId, priority);
        return res.status(201).json({
            success: true,
            code: 201,
            message: "Commentator added successfully",
            data: saved,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to add commentator",
            error_detail: err.message,
        });
    }
};
exports.addFixtureCommentator = addFixtureCommentator;
const updateFixtureCommentator = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updated = await fixtureCommentators_service_1.fixtureCommentatorService.updateFixtureCommentator(id, req.body);
        if (!updated) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "FixtureCommentator not found",
            });
        }
        return res.status(200).json({
            success: true,
            code: 200,
            message: "FixtureCommentator updated successfully",
            data: updated,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to update fixture commentator",
            error_detail: err.message,
        });
    }
};
exports.updateFixtureCommentator = updateFixtureCommentator;
const deleteFixtureCommentator = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await fixtureCommentators_service_1.fixtureCommentatorService.deleteFixtureCommentator(id);
        if (!result || result.affected === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "FixtureCommentator not found",
            });
        }
        return res.status(200).json({
            success: true,
            code: 200,
            message: "FixtureCommentator deleted successfully",
            data: { id },
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to delete fixture commentator",
            error_detail: err.message,
        });
    }
};
exports.deleteFixtureCommentator = deleteFixtureCommentator;
