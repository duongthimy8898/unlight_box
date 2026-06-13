"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalAuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repositories_1 = require("../../db/repositories");
const InternalUser_entity_1 = require("../../entities/InternalUser.entity");
class InternalAuthService {
    static async login(username, password) {
        const user = await repositories_1.internalUserRepo.findOne({ where: { username } });
        if (!user)
            throw new Error("Không tìm thấy người dùng");
        if (user.status !== InternalUser_entity_1.InternalUserStatus.ACTIVE)
            throw new Error("Tài khoản không hoạt động");
        const match = await bcryptjs_1.default.compare(password, user.hashedPassword);
        if (!match)
            throw new Error("Sai mật khẩu");
        return {
            access_token: jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" }),
            user: user,
        };
    }
}
exports.InternalAuthService = InternalAuthService;
