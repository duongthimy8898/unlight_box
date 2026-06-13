import { internalUserRepo } from "../db/repositories";
import {
  InternalUserRole,
  InternalUserStatus,
} from "../entities/InternalUser.entity";
import bcrypt from "bcryptjs";

export async function initSysAccount() {
  const existing = await internalUserRepo.findOne({
    where: { role: InternalUserRole.ADMINISTRATOR },
  });
  if (existing) {
    console.log("*** SysAccount an exists:", existing.username);
    return;
  }
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "sys_ad@saomai.tv!5602",
    10
  );
  const admin = internalUserRepo.create({
    username: process.env.ADMIN_USERNAME || "sys_ad",
    email: process.env.ADMIN_EMAIL || "sys_ad@saomai.tv",
    name: "Sys Admin",
    bio: "Đây là tài khoản quản trị hệ thống với quyền cao nhất.",
    hashedPassword,
    role: InternalUserRole.ADMINISTRATOR,
    status: InternalUserStatus.ACTIVE,
  });
  await internalUserRepo.save(admin);

  console.log("*** SysAccount created:", admin.email);
}
