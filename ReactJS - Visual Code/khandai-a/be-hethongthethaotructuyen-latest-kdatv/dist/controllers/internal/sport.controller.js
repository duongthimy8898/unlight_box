"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSport = exports.updateSport = exports.createSport = exports.getSport = exports.getAllSports = void 0;
const sport_service_1 = require("../../services/internal/sport.service");
const getAllSports = async (req, res) => {
    try {
        const data = await sport_service_1.sportService.getAllSports();
        res
            .status(200)
            .json({ success: true, code: 200, message: "Fetched sports", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllSports = getAllSports;
const getSport = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await sport_service_1.sportService.getSport(by, value);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Sport not found" });
        }
        res
            .status(200)
            .json({ success: true, code: 200, message: "Fetched sport", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getSport = getSport;
const createSport = async (req, res) => {
    try {
        const data = await sport_service_1.sportService.createSport(req.body);
        res
            .status(201)
            .json({ success: true, code: 201, message: "Sport created", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.createSport = createSport;
const updateSport = async (req, res) => {
    try {
        const data = await sport_service_1.sportService.updateSport(Number(req.params.id), req.body);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Sport not found" });
        }
        res
            .status(200)
            .json({ success: true, code: 200, message: "Sport updated", data });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.updateSport = updateSport;
const deleteSport = async (req, res) => {
    try {
        const result = await sport_service_1.sportService.deleteSport(Number(req.params.id));
        if (result.affected === 0) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "Sport not found" });
        }
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "Sport deleted",
            data: { id: req.params.id },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.deleteSport = deleteSport;
