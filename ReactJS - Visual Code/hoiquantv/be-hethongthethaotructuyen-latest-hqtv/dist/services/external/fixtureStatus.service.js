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
};
