"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = void 0;
const repositories_1 = require("../../db/repositories");
exports.teamService = {
    async getAllTeams() {
        return await repositories_1.teamRepo.find({
            relations: ["sport"],
        });
    },
    async getTeam(by, value) {
        const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
        return await repositories_1.teamRepo.findOne({
            where,
            relations: ["sport"],
        });
    },
};
