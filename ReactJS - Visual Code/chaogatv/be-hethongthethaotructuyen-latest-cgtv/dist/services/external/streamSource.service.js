"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamSourceService = void 0;
const repositories_1 = require("../../db/repositories");
exports.streamSourceService = {
    async getAllStreamSources() {
        return await repositories_1.streamSourceRepo.find({
            relations: ["commentator"],
        });
    },
    async getStreamSource(id) {
        return await repositories_1.streamSourceRepo.findOne({
            where: { id },
            relations: ["commentator"],
        });
    },
};
