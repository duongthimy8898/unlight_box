"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureScore = exports.updateFixtureScore = exports.createFixtureScore = exports.getFixtureScore = exports.getAllFixtureScores = void 0;
const fixtureScore_service_1 = require("../../services/internal/fixtureScore.service");
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
const createFixtureScore = async (req, res) => {
    try {
        const data = await fixtureScore_service_1.fixtureScoreService.createFixtureScore(req.body);
        res.status(201).json({ success: true, code: 201, message: "FixtureScore created", data });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.createFixtureScore = createFixtureScore;
const updateFixtureScore = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await fixtureScore_service_1.fixtureScoreService.updateFixtureScore(id, req.body);
        if (!data) {
            return res.status(404).json({ success: false, code: 404, message: "FixtureScore not found" });
        }
        res.status(200).json({ success: true, code: 200, message: "FixtureScore updated", data });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.updateFixtureScore = updateFixtureScore;
const deleteFixtureScore = async (req, res) => {
    try {
        const result = await fixtureScore_service_1.fixtureScoreService.deleteFixtureScore(Number(req.params.id));
        if (result.affected === 0) {
            return res.status(404).json({ success: false, code: 404, message: "FixtureScore not found" });
        }
        res.status(200).json({ success: true, code: 200, message: "FixtureScore deleted", data: { id: req.params.id } });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.deleteFixtureScore = deleteFixtureScore;
