"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureStatusService = void 0;
const repositories_1 = require("../../db/repositories");
exports.fixtureStatusService = {
    // Lấy tất cả
    async getAllFixtureStatuses() {
        return await repositories_1.fixtureStatusRepo.find();
    },
    // Lấy theo id
    async getFixtureStatus(id) {
        return await repositories_1.fixtureStatusRepo.findOneBy({ id });
    },
    // Tạo mới
    async createFixtureStatus(payload) {
        if (!payload.description) {
            throw new Error("Description is required");
        }
        const status = repositories_1.fixtureStatusRepo.create(payload);
        return await repositories_1.fixtureStatusRepo.save(status);
    },
    // Cập nhật
    async updateFixtureStatus(id, payload) {
        let status = await repositories_1.fixtureStatusRepo.findOneBy({ id });
        if (!status)
            return null;
        repositories_1.fixtureStatusRepo.merge(status, payload);
        return await repositories_1.fixtureStatusRepo.save(status);
    },
    // Xoá
    async deleteFixtureStatus(id) {
        return await repositories_1.fixtureStatusRepo.delete(id);
    },
};
