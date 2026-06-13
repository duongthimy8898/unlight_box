"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInternalUser = exports.updateInternalUser = exports.createInternalUser = exports.getInternalUser = exports.getAllInternalUsersBy = exports.getAllInternalUsers = void 0;
const internalUser_service_1 = require("../../services/internal/internalUser.service");
const getAllInternalUsers = async (_req, res) => {
    try {
        const data = await internalUser_service_1.internalUserService.getAll();
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "Fetched all internal users",
            data,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllInternalUsers = getAllInternalUsers;
const getAllInternalUsersBy = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await internalUser_service_1.internalUserService.getAllBy(by, value);
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "Fetched internal users by filter",
            data,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getAllInternalUsersBy = getAllInternalUsersBy;
const getInternalUser = async (req, res) => {
    try {
        const { by, value } = req.query;
        const data = await internalUser_service_1.internalUserService.getOne(by, value);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "InternalUser not found" });
        }
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "Fetched internal user",
            data,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.getInternalUser = getInternalUser;
const createInternalUser = async (req, res) => {
    try {
        const data = await internalUser_service_1.internalUserService.create(req.body);
        res
            .status(201)
            .json({
            success: true,
            code: 201,
            message: "InternalUser created",
            data,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.createInternalUser = createInternalUser;
const updateInternalUser = async (req, res) => {
    try {
        const data = await internalUser_service_1.internalUserService.update(Number(req.params.id), req.body);
        if (!data) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "InternalUser not found" });
        }
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "InternalUser updated",
            data,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, code: 400, message: err.message });
    }
};
exports.updateInternalUser = updateInternalUser;
const deleteInternalUser = async (req, res) => {
    try {
        const result = await internalUser_service_1.internalUserService.delete(Number(req.params.id));
        if (result.affected === 0) {
            return res
                .status(404)
                .json({ success: false, code: 404, message: "InternalUser not found" });
        }
        res
            .status(200)
            .json({
            success: true,
            code: 200,
            message: "InternalUser deleted",
            data: { id: req.params.id },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, code: 500, message: err.message });
    }
};
exports.deleteInternalUser = deleteInternalUser;
