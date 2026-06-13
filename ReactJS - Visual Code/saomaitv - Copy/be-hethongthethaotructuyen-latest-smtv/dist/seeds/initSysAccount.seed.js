"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSysAccount = initSysAccount;
const repositories_1 = require("../db/repositories");
const InternalUser_entity_1 = require("../entities/InternalUser.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function initSysAccount() {
    const existing = await repositories_1.internalUserRepo.findOne({
        where: { role: InternalUser_entity_1.InternalUserRole.ADMINISTRATOR },
    });
    if (existing) {
        console.log("*** SysAccount an exists:", existing.username);
        return;
    }
    const hashedPassword = await bcryptjs_1.default.hash(process.env.ADMIN_PASSWORD || "sys_ad@saomai.tv!5602", 10);
    const admin = repositories_1.internalUserRepo.create({
        username: process.env.ADMIN_USERNAME || "sys_ad",
        email: process.env.ADMIN_EMAIL || "sys_ad@saomai.tv",
        name: "Sys Admin",
        bio: "Đây là tài khoản quản trị hệ thống với quyền cao nhất.",
        hashedPassword,
        role: InternalUser_entity_1.InternalUserRole.ADMINISTRATOR,
        status: InternalUser_entity_1.InternalUserStatus.ACTIVE,
    });
    await repositories_1.internalUserRepo.save(admin);
    console.log("*** SysAccount created:", admin.email);
}
