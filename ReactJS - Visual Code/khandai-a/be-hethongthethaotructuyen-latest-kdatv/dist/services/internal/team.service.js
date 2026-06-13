"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = void 0;
const nanoid_1 = require("nanoid");
const repositories_1 = require("../../db/repositories");
const slug_1 = __importDefault(require("slug"));
exports.teamService = {
    async getAllTeams() {
        return await repositories_1.teamRepo
            .createQueryBuilder("team")
            .leftJoinAndSelect("team.sport", "sport")
            .select("team") // lấy tất cả cột của team
            .addSelect(["sport.id", "sport.slug", "sport.name"])
            .getMany();
    },
    async getTeam(by, value) {
        const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
        return await repositories_1.teamRepo.findOne({
            where,
            relations: ["sport"],
        });
    },
    async createTeam(payload) {
        payload.slug = `${(0, slug_1.default)(payload.name)}.${(0, nanoid_1.nanoid)(10)}`;
        const sport = await repositories_1.sportRepo.findOneBy({ id: payload.sportId ?? -9999 });
        if (!sport)
            throw new Error("Invalid sportId");
        const team = repositories_1.teamRepo.create({ ...payload, sport });
        return await repositories_1.teamRepo.save(team);
    },
    async updateTeam(id, payload) {
        let team = await repositories_1.teamRepo.findOne({ where: { id }, relations: ["sport"] });
        if (!team)
            return null;
        repositories_1.teamRepo.merge(team, payload);
        return await repositories_1.teamRepo.save(team);
    },
    async deleteTeam(id) {
        return await repositories_1.teamRepo.delete(id);
    },
};
