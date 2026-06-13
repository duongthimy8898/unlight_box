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
};
