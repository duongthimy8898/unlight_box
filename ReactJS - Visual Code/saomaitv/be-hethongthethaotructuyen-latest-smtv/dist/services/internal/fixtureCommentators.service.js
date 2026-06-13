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
    // Add commentator
    async addFixtureCommentator(fixtureId, commentatorId, priority = 0) {
        const fixture = await repositories_1.fixtureRepo.findOneBy({ id: fixtureId });
        if (!fixture)
            throw new Error("Fixture not found");
        const commentator = await repositories_1.internalUserRepo.findOneBy({ id: commentatorId });
        if (!commentator)
            throw new Error("Invalid commentatorId");
        const fc = repositories_1.fixtureCommentatorRepo.create({
            fixture,
            commentator,
            priority,
        });
        return await repositories_1.fixtureCommentatorRepo.save(fc);
    },
    // Update
    async updateFixtureCommentator(id, data) {
        let fc = await repositories_1.fixtureCommentatorRepo.findOne({
            where: { id },
            relations: ["commentator", "fixture"],
        });
        if (!fc)
            return null;
        repositories_1.fixtureCommentatorRepo.merge(fc, data);
        return await repositories_1.fixtureCommentatorRepo.save(fc);
    },
    // Delete
    async deleteFixtureCommentator(id) {
        return await repositories_1.fixtureCommentatorRepo.delete(id);
    },
};
