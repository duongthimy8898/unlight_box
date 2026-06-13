"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replayService = void 0;
const repositories_1 = require("../../db/repositories");
exports.replayService = {
    async getAllReplays() {
        return await repositories_1.replayRepo.find({
            relations: ["sport"],
        });
    },
    async getReplay(by, value) {
        const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
        return await repositories_1.replayRepo.findOne({
            where,
            relations: ["sport"],
        });
    },
};
