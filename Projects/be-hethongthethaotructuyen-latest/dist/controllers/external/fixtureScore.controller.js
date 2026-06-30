"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFixtureScore = exports.getAllFixtureScores = void 0;
const fixtureScore_service_1 = require("../../services/external/fixtureScore.service");
const getAllFixtureScores = async (_req, res) => {
    try {
        const data = await fixtureScore_service_1.fixtureScoreService.getAllFixtureScores();
        res.status(200).json({ success: true, code: 200, message: "Fetched all fixture scores", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllFixtureScores = getAllFixtureScores;
const getFixtureScore = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await fixtureScore_service_1.fixtureScoreService.getFixtureScore(id);
        if (!data) {
            return res.status(404).json({ success: false, code: 404, message: "FixtureScore not found" });
        }
        res.status(200).json({ success: true, code: 200, message: "Fetched fixture score", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getFixtureScore = getFixtureScore;
