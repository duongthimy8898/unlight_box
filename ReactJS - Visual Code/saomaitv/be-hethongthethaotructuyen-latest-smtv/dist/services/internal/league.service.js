"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leagueService = void 0;
const nanoid_1 = require("nanoid");
const repositories_1 = require("../../db/repositories");
const slug_1 = __importDefault(require("slug"));
exports.leagueService = {
    async getAllLeagues() {
        return await repositories_1.leagueRepo.find({
            relations: ["sport"],
        });
    },
    async getLeague(by, value) {
        let where;
        switch (by) {
            case "id":
                where = { id: Number(value) };
                break;
            case "referenceId":
                where = { referenceId: Number(value) };
                break;
            case "slug":
                where = { slug: String(value) };
                break;
            case "name":
                where = { name: String(value) };
                break;
            default:
                throw new Error("Invalid search field");
        }
        return await repositories_1.leagueRepo.findOne({
            where,
            relations: ["sport"],
        });
    },
    async createLeague(payload) {
        payload.slug = `${(0, slug_1.default)(payload.name)}.${(0, nanoid_1.nanoid)(10)}`;
        const sport = await repositories_1.sportRepo.findOneBy({ id: payload.sportId ?? -9999 });
        if (!sport)
            throw new Error("Invalid sportId");
        const league = repositories_1.leagueRepo.create({
            ...payload,
            sport,
        });
        return await repositories_1.leagueRepo.save(league);
    },
    async updateLeague(id, payload) {
        let league = await repositories_1.leagueRepo.findOne({
            where: { id },
            relations: ["sport"],
        });
        if (!league)
            return null;
        repositories_1.leagueRepo.merge(league, payload);
        return await repositories_1.leagueRepo.save(league);
    },
    async deleteLeague(id) {
        return await repositories_1.leagueRepo.delete(id);
    },
};
