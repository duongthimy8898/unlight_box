"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureScoreService = void 0;
const repositories_1 = require("../../db/repositories");
exports.fixtureScoreService = {
    // Lấy tất cả
    async getAllFixtureScores() {
        return await repositories_1.fixtureScoreRepo.find({ relations: ["fixture"] });
    },
    // Lấy theo id
    async getFixtureScore(id) {
        return await repositories_1.fixtureScoreRepo.findOne({
            where: { id },
            relations: ["fixture"],
        });
    },
    // Tạo mới
    async createFixtureScore(payload) {
        const { fixtureId, home, away } = payload;
        const fixture = await repositories_1.fixtureRepo.findOneBy({ id: fixtureId ?? -9999 });
        if (!fixture)
            throw new Error("Invalid fixtureId");
        const score = repositories_1.fixtureScoreRepo.create({
            home: home ?? 0,
            away: away ?? 0,
            fixture,
        });
        return await repositories_1.fixtureScoreRepo.save(score);
    },
    // Cập nhật
    async updateFixtureScore(id, payload) {
        let score = await repositories_1.fixtureScoreRepo.findOneBy({ id });
        if (!score)
            return null;
        repositories_1.fixtureScoreRepo.merge(score, payload);
        return await repositories_1.fixtureScoreRepo.save(score);
    },
    // Xóa
    async deleteFixtureScore(id) {
        return await repositories_1.fixtureScoreRepo.delete(id);
    },
};
