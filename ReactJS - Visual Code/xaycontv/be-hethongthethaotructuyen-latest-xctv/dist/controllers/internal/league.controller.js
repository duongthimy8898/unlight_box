"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLeague = exports.updateLeague = exports.createLeague = exports.getLeague = exports.getAllLeagues = void 0;
const league_service_1 = require("../../services/internal/league.service");
const getAllLeagues = async (req, res) => {
    try {
        const data = await league_service_1.leagueService.getAllLeagues();
        res
            .status(200)
            .json({ success: true, code: 200, message: "Fetched leagues", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllLeagues = getAllLeagues;
const getLeague = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await league_service_1.leagueService.getLeague(by, value);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "League not found" });
        }
        res
            .status(200)
            .json({ success: true, code: 200, message: "Fetched league", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getLeague = getLeague;
const createLeague = async (req, res) => {
    try {
        const data = await league_service_1.leagueService.createLeague(req.body);
        res
            .status(201)
            .json({ success: true, code: 201, message: "League created", data });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.createLeague = createLeague;
const updateLeague = async (req, res) => {
    try {
        const data = await league_service_1.leagueService.updateLeague(Number(req.params.id), req.body);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "League not found" });
        }
        res
            .status(200)
            .json({ success: true, code: 200, message: "League updated", data });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.updateLeague = updateLeague;
const deleteLeague = async (req, res) => {
    try {
        const result = await league_service_1.leagueService.deleteLeague(Number(req.params.id));
        if (result.affected === 0) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "League not found" });
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: "League deleted",
            data: { id: req.params.id },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.deleteLeague = deleteLeague;
