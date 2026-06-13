import { internalUserRepo } from "../../db/repositories";
import bcrypt from "bcryptjs";
import {
  InternalUserRole,
  InternalUserStatus,
} from "../../entities/InternalUser.entity";

export const internalUserService = {
  // Lấy tất cả
  async getAll() {
    const users = await internalUserRepo.find({
      relations: ["fixtureCommentators"],
    });
    return users.map(({ hashedPassword, ...u }) => u);
  },

  // Lấy tất cả theo filter
  async getAllBy(by: string, value: any) {
    let users: any[] = [];

    if (by === "id") {
      users = await internalUserRepo.find({ where: { id: Number(value) } });
    } else if (by === "username") {
      users = await internalUserRepo.find({
        where: { username: String(value) },
        relations: ["fixtureCommentators"],
      });
    } else if (by === "email") {
      users = await internalUserRepo.find({
        where: { email: String(value) },
        relations: ["fixtureCommentators"],
      });
    } else if (by === "role") {
      users = await internalUserRepo.find({
        where: { role: String(value) as InternalUserRole },
        relations: ["fixtureCommentators"],
      });
    }

    return users.map(({ hashedPassword, ...u }) => u);
  },

  // Lấy một user
  async getOne(by: string, value: any) {
    let user: any;
    if (by === "id") {
      user = await internalUserRepo.findOne({ where: { id: Number(value) } });
    } else if (by === "username") {
      user = await internalUserRepo.findOne({
        where: { username: String(value) },
      });
    } else if (by === "email") {
      user = await internalUserRepo.findOne({
        where: { email: String(value) },
      });
    }

    if (!user) return null;
    const { hashedPassword, ...safeUser } = user;
    return safeUser;
  },

  // Tạo mới
  async create(payload: any) {
    const {
      username,
      rawPassword,
      email,
      phoneNumber,
      name,
      nickname,
      bio,
      avatarUrl,
      coverUrl,
      role,
      status,
    } = payload;

    if (!username || !rawPassword) {
      throw new Error("Username and password are required");
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const user = internalUserRepo.create({
      username,
      hashedPassword,
      email,
      phoneNumber,
      name,
      nickname,
      bio,
      avatarUrl,
      coverUrl,
      role: role ?? InternalUserRole.COMMENTATOR,
      status: status ?? InternalUserStatus.ACTIVE,
    });

    const saved = await internalUserRepo.save(user);
    const { hashedPassword: _, ...safeUser } = saved;
    return safeUser;
  },

  // Cập nhật
  async update(id: number, payload: any) {
    let user = await internalUserRepo.findOneBy({ id });
    if (!user) return null;

    const { password, ...data } = payload;
    if (password) {
      data.hashedPassword = await bcrypt.hash(password, 10);
    }

    internalUserRepo.merge(user, data);
    const updated = await internalUserRepo.save(user);

    const { hashedPassword, ...safeUser } = updated;
    return safeUser;
  },

  // Xoá
  async delete(id: number) {
    return await internalUserRepo.delete(id);
  },
};
