"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalUserService = void 0;
const repositories_1 = require("../../db/repositories");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const InternalUser_entity_1 = require("../../entities/InternalUser.entity");
const axios_1 = __importDefault(require("axios"));
exports.internalUserService = {
    // Lấy tất cả
    async getAll() {
        const users = await repositories_1.internalUserRepo.find({
            relations: ["fixtureCommentators"],
        });
        return users.map(({ hashedPassword, ...u }) => u);
    },
    // Lấy tất cả theo filter
    async getAllBy(by, value) {
        let users = [];
        if (by === "id") {
            users = await repositories_1.internalUserRepo.find({ where: { id: Number(value) } });
        }
        else if (by === "username") {
            users = await repositories_1.internalUserRepo.find({
                where: { username: String(value) },
                relations: ["fixtureCommentators"],
            });
        }
        else if (by === "email") {
            users = await repositories_1.internalUserRepo.find({
                where: { email: String(value) },
                relations: ["fixtureCommentators"],
            });
        }
        else if (by === "role") {
            users = await repositories_1.internalUserRepo.find({
                where: { role: String(value) },
                relations: ["fixtureCommentators"],
            });
        }
        return users.map(({ hashedPassword, ...u }) => u);
    },
    // Lấy một user
    async getOne(by, value) {
        let user;
        if (by === "id") {
            user = await repositories_1.internalUserRepo.findOne({ where: { id: Number(value) } });
        }
        else if (by === "username") {
            user = await repositories_1.internalUserRepo.findOne({
                where: { username: String(value) },
            });
        }
        else if (by === "email") {
            user = await repositories_1.internalUserRepo.findOne({
                where: { email: String(value) },
            });
        }
        if (!user)
            return null;
        const { hashedPassword, ...safeUser } = user;
        return safeUser;
    },
    // Tạo mới
    async create(payload) {
        const { username, rawPassword, email, phoneNumber, name, nickname, bio, avatarUrl, coverUrl, role, status } = payload;
        if (!username || !rawPassword) {
            throw new Error("Username and password are required");
        }
        const hashedPassword = await bcryptjs_1.default.hash(rawPassword, 10);
        let chatChannelKeyId = null;
        const cboxApi = process.env.CBOX_API_URL || "https://www.cbox.ws/apis/threads.php?id=5-960460-0V4sGi&key=c7ea97f4e01bfe5faa03f5c0d30a3471&act=mkthread";
        console.log("Creating chat channel via CBox API:", cboxApi);
        const responseCbox = await axios_1.default.get(cboxApi);
        console.log("CBox API response:", responseCbox.data);
        const dataCbox = responseCbox.data;
        console.log("CBox data:", dataCbox);
        const segs = dataCbox.trim().split(/\s+/);
        const cboxId = segs[1]?.trim();
        const cboxKey = segs[2]?.trim();
        if (cboxId && cboxKey) {
            chatChannelKeyId = `${cboxId}-${cboxKey}`;
        }
        const user = repositories_1.internalUserRepo.create({
            username,
            hashedPassword,
            email,
            phoneNumber,
            name,
            nickname,
            bio,
            avatarUrl,
            coverUrl,
            chatChannelKeyId,
            role: role ?? InternalUser_entity_1.InternalUserRole.COMMENTATOR,
            status: status ?? InternalUser_entity_1.InternalUserStatus.ACTIVE,
        });
        const saved = await repositories_1.internalUserRepo.save(user);
        const { hashedPassword: _, ...safeUser } = saved;
        return safeUser;
    },
    // Cập nhật
    async update(id, payload) {
        let user = await repositories_1.internalUserRepo.findOneBy({ id });
        if (!user)
            return null;
        const { password, ...data } = payload;
        if (password) {
            data.hashedPassword = await bcryptjs_1.default.hash(password, 10);
        }
        repositories_1.internalUserRepo.merge(user, data);
        const updated = await repositories_1.internalUserRepo.save(user);
        const { hashedPassword, ...safeUser } = updated;
        return safeUser;
    },
    // Xoá
    async delete(id) {
        return await repositories_1.internalUserRepo.delete(id);
    },
};
