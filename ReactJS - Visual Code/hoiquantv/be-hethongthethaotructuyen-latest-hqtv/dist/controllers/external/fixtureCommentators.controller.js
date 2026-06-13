"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFixtureCommentators = exports.getAllFixtureCommentators = void 0;
const fixtureCommentators_service_1 = require("../../services/external/fixtureCommentators.service");
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
