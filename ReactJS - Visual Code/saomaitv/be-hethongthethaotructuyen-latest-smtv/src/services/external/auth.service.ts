import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { externalUserRepo } from "../../db/repositories";
import { ExternalUserStatus } from "../../entities/ExternalUser.entity";

export class ExternalAuthService {
  static async login(identifier: string, rawPassword: string): Promise<object> {
    const user = await externalUserRepo.findOne({
      where: [{ username: identifier }, { phoneNumber: identifier }],
    });
    if (!user) throw new Error("Không tìm thấy người dùng");
    if (user.status !== ExternalUserStatus.ACTIVE)
      throw new Error("Tài khoản không hoạt động");

    const match = await bcrypt.compare(rawPassword, user.hashedPassword);
    if (!match) throw new Error("Sai mật khẩu");

    return {
      access_token: jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1d" }
      ),
      user: user,
    };
  }

  static async register(
    username: string,
    phoneNumber: string,
    name: string,
    rawPassword: string
  ): Promise<object> {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const newUser = externalUserRepo.create({
      username,
      phoneNumber,
      name,
      hashedPassword,
    });
    const savedUser = await externalUserRepo.save(newUser);
    return savedUser;
  }
}
