"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeam = exports.getAllTeams = void 0;
const team_service_1 = require("../../services/internal/team.service");
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
const createTeam = async (req, res) => {
    try {
        const data = await team_service_1.teamService.createTeam(req.body);
        res
            .status(201)
            .json({ success: true, code: 201, message: "Team created", data });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.createTeam = createTeam;
const updateTeam = async (req, res) => {
    try {
        const data = await team_service_1.teamService.updateTeam(Number(req.params.id), req.body);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Team not found" });
        }
        res
            .status(200)
            .json({ success: true, code: 200, message: "Team updated", data });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.updateTeam = updateTeam;
const deleteTeam = async (req, res) => {
    try {
        const result = await team_service_1.teamService.deleteTeam(Number(req.params.id));
        if (result.affected === 0) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Team not found" });
        }
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "Team deleted",
            data: { id: req.params.id },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.deleteTeam = deleteTeam;
