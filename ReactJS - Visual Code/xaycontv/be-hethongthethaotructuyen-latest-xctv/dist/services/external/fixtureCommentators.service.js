"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureCommentatorService = void 0;
const repositories_1 = require("../../db/repositories");
exports.fixtureCommentatorService = {
    // Lấy tất cả
    async getAllFixtureCommentators() {
        return await repositories_1.fixtureCommentatorRepo.find({
            relations: ["commentator", "fixture"],
            order: { priority: "ASC" },
        });
    },
    // Lấy commentators theo fixtureId
    async getFixtureCommentators(fixtureId) {
        return await repositories_1.fixtureCommentatorRepo.find({
            where: { fixture: { id: fixtureId } },
            relations: ["commentator", "fixture"],
            order: { priority: "ASC" },
        });
    },
};
