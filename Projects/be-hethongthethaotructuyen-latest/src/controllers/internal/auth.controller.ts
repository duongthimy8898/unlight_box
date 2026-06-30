import { Request, Response } from "express";
import { InternalAuthService } from "../../services/internal/auth.service";

export const internalAuthLogin = async (req: Request, res: Response) => {
  try {
    const { identifier, rawPassword } = req.body;
    const authData = await InternalAuthService.login(identifier, rawPassword);
    res.json({
      code: 200,
      message: "Đăng nhập thành công",
      data: authData,
    });
  } catch (err: any) {
    res.status(401).json({
      code: 401,
      message: err.message || "Đăng nhập không thành công",
    });
  }
};
