"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeam = exports.getAllTeams = void 0;
const team_service_1 = require("../../services/external/team.service");
const getAllTeams = async (req, res) => {
    try {
        const data = await team_service_1.teamService.getAllTeams();
        res
            .status(200)
            .json({ success: true, code: 200, message: "Fetched teams", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllTeams = getAllTeams;
const getTeam = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await team_service_1.teamService.getTeam(by, value);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Team not found" });
        }
        res
            .status(200)
            .json({ success: true, code: 200, message: "Fetched team", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getTeam = getTeam;
