"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replayService = void 0;
const nanoid_1 = require("nanoid");
const repositories_1 = require("../../db/repositories");
const slug_1 = __importDefault(require("slug"));
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
    async createReplay(payload) {
        payload.slug = `${(0, slug_1.default)(payload.name)}.${(0, nanoid_1.nanoid)(10)}`;
        const sport = await repositories_1.sportRepo.findOneBy({ id: payload.sportId ?? -9999 });
        if (!sport)
            throw new Error("Invalid sportId");
        const replay = repositories_1.replayRepo.create({
            ...payload,
            sport,
        });
        return await repositories_1.replayRepo.save(replay);
    },
    async updateReplay(id, payload) {
        let replay = await repositories_1.replayRepo.findOne({
            where: { id },
            relations: ["sport"],
        });
        if (!replay)
            return null;
        repositories_1.replayRepo.merge(replay, payload);
        return await repositories_1.replayRepo.save(replay);
    },
    async deleteReplay(id) {
        return await repositories_1.replayRepo.delete(id);
    },
};
