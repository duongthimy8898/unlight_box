"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalAuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repositories_1 = require("../../db/repositories");
const ExternalUser_entity_1 = require("../../entities/ExternalUser.entity");
class ExternalAuthService {
    static async login(identifier, rawPassword) {
        const user = await repositories_1.externalUserRepo.findOne({
            where: [{ username: identifier }, { phoneNumber: identifier }],
        });
        if (!user)
            throw new Error("Không tìm thấy người dùng");
        if (user.status !== ExternalUser_entity_1.ExternalUserStatus.ACTIVE)
            throw new Error("Tài khoản không hoạt động");
        const match = await bcryptjs_1.default.compare(rawPassword, user.hashedPassword);
        if (!match)
            throw new Error("Sai mật khẩu");
        return {
            access_token: jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" }),
            user: user,
        };
    }
    static async register(username, phoneNumber, name, rawPassword) {
        const hashedPassword = await bcryptjs_1.default.hash(rawPassword, 10);
        const newUser = repositories_1.externalUserRepo.create({
            username,
            phoneNumber,
            name,
            hashedPassword,
        });
        const savedUser = await repositories_1.externalUserRepo.save(newUser);
        return savedUser;
    }
}
exports.ExternalAuthService = ExternalAuthService;
