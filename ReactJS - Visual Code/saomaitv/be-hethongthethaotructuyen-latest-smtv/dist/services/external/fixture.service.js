"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureService = void 0;
const repositories_1 = require("../../db/repositories");
const typeorm_1 = require("typeorm");
exports.fixtureService = {
    /**
     * Lấy tất cả fixtures (luôn query DB)
     */
    async getAllFixtures() {
        return await repositories_1.fixtureRepo.find({
            relations: ["sport", "league", "homeTeam", "awayTeam", "score", "status", "fixtureCommentators", "fixtureCommentators.commentator"],
        });
    },
    /**
     * Lấy tất cả unfinished fixtures (luôn query DB) ["TBD", "NS", "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"]
     */
    async getUnfinishedFixtures() {
        return await repositories_1.fixtureRepo.find({
            where: [
                { status: (0, typeorm_1.IsNull)() },
                {
                    status: {
                        code: (0, typeorm_1.In)(["TBD", "NS", "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"]),
                    },
                },
            ],
            relations: ["sport", "league", "homeTeam", "awayTeam", "score", "status", "fixtureCommentators", "fixtureCommentators.commentator"],
        });
    },
    /**
     * Lấy 100 finished fixtures (luôn query DB) ["FT", "AET", "PEN"]
     */
    async getFinishedFixtures() {
        return await repositories_1.fixtureRepo.find({
            where: { status: { code: (0, typeorm_1.In)(["FT", "AET", "PEN"]) } },
            relations: ["sport", "league", "homeTeam", "awayTeam", "score", "status", "fixtureCommentators", "fixtureCommentators.commentator"],
        });
    },
    /**
     * Lấy fixture theo id hoặc slug
     */
    async getFixture(by, value) {
        const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
        return await repositories_1.fixtureRepo.findOne({
            where,
            relations: ["sport", "league", "homeTeam", "awayTeam", "score", "status", "fixtureCommentators", "fixtureCommentators.commentator"],
        });
    },
};
