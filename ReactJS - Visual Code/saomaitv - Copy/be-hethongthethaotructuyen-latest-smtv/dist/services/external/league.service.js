"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leagueService = void 0;
const repositories_1 = require("../../db/repositories");
exports.leagueService = {
    async getAllLeagues() {
        return await repositories_1.leagueRepo.find({
            relations: ["sport"],
        });
    },
    async getLeague(by, value) {
        const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
        return await repositories_1.leagueRepo.findOne({
            where,
            relations: ["sport"],
        });
    },
};
