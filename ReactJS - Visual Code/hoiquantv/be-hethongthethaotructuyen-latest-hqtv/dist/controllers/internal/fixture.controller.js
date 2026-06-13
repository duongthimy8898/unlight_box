"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixture = exports.doneFixture = exports.acts = exports.updateFixture = exports.createFixture = exports.getFixture = exports.getAllFixtures = void 0;
const fixture_service_1 = require("../../services/internal/fixture.service");
/**
 * GET all fixtures
 */
const getAllFixtures = async (req, res) => {
    try {
        const data = await fixture_service_1.fixtureService.getAllFixtures();
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Fetched all fixtures successfully",
            data,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to fetch fixtures",
            error_detail: err.message,
        });
    }
};
exports.getAllFixtures = getAllFixtures;
/**
 * GET fixture by id | slug
 */
const getFixture = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await fixture_service_1.fixtureService.getFixture(by, value);
        if (!data) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Fixture not found",
                error_detail: { by, value },
            });
        }
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Fetched fixture successfully",
            data,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to fetch fixture",
            error_detail: err.message,
        });
    }
};
exports.getFixture = getFixture;
/**
 * CREATE fixture
 */
const createFixture = async (req, res) => {
    try {
        const saved = await fixture_service_1.fixtureService.createFixture(req.body);
        return res.status(201).json({
            success: true,
            code: 201,
            message: "Fixture created successfully",
            data: saved,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Failed to create fixture",
            error_detail: err.message,
        });
    }
};
exports.createFixture = createFixture;
/**
 * UPDATE fixture
 */
const updateFixture = async (req, res) => {
    try {
        const { id } = req.params;
        const saved = await fixture_service_1.fixtureService.updateFixture(Number(id), req.body);
        if (!saved) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Fixture not found",
                error_detail: { id },
            });
        }
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Fixture updated successfully",
            data: saved,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Failed to update fixture",
            error_detail: err.message,
        });
    }
};
exports.updateFixture = updateFixture;
/**
 * UPDATE fixture acts (pin, hot, live, ...)
 */
const acts = async (req, res) => {
    try {
        const id = Number(req.query.id);
        const act = String(req.query.act);
        if (!["pin", "unpin", "hot", "unhot", "live", "unlive"].includes(act)) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: "Invalid act",
                error_detail: { act },
            });
        }
        const saved = await fixture_service_1.fixtureService.updateAct(id, act);
        if (!saved) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Fixture not found",
                error_detail: { id },
            });
        }
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Fixture act updated successfully",
            data: saved,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed",
            error_detail: err.message,
        });
    }
};
exports.acts = acts;
/**
 * Mark fixture as done (Full Time)
 */
const doneFixture = async (req, res) => {
    try {
        const { id } = req.params;
        const saved = await fixture_service_1.fixtureService.doneFixture(Number(id));
        if (!saved) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Fixture not found",
                error_detail: { id },
            });
        }
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Fixture done successfully",
            data: saved,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to done fixture",
            error_detail: err.message,
        });
    }
};
exports.doneFixture = doneFixture;
/**
 * DELETE fixture
 */
const deleteFixture = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await fixture_service_1.fixtureService.deleteFixture(id);
        if (result.affected === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Fixture not found",
                error_detail: { id },
            });
        }
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Fixture deleted successfully",
            data: { id },
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Failed to delete fixture",
            error_detail: err.message,
        });
    }
};
exports.deleteFixture = deleteFixture;
