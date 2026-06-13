"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sportService = void 0;
const nanoid_1 = require("nanoid");
const repositories_1 = require("../../db/repositories");
const slug_1 = __importDefault(require("slug"));
exports.sportService = {
    async getAllSports() {
        return await repositories_1.sportRepo.find({
            relations: [],
        });
    },
    async getSport(by, value) {
        const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
        return await repositories_1.sportRepo.findOne({
            where,
            relations: [],
        });
    },
    async createSport(payload) {
        payload.slug = `${(0, slug_1.default)(payload.name)}.${(0, nanoid_1.nanoid)(10)}`;
        const sport = repositories_1.sportRepo.create(payload);
        return await repositories_1.sportRepo.save(sport);
    },
    async updateSport(id, payload) {
        let sport = await repositories_1.sportRepo.findOneBy({ id });
        if (!sport)
            return null;
        repositories_1.sportRepo.merge(sport, payload);
        return await repositories_1.sportRepo.save(sport);
    },
    async deleteSport(id) {
        return await repositories_1.sportRepo.delete(id);
    },
};
