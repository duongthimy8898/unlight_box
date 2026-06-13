import { Request, Response } from "express";
import { ExternalAuthService } from "../../services/external/auth.service";

export const externalAuthLogin = async (req: Request, res: Response) => {
  try {
    const { identifier, rawPassword } = req.body;
    const authData = await ExternalAuthService.login(identifier, rawPassword);
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

export const externalAuthRegister = async (req: Request, res: Response) => {
  try {
    const { username, phoneNumber, name, rawPassword } = req.body;
    const authData = await ExternalAuthService.register(
      username,
      phoneNumber,
      name,
      rawPassword
    );
    res.status(201).json({
      code: 201,
      message: "Đăng ký tài khoản thành công",
      data: authData,
    });
  } catch (err: any) {
    res.status(401).json({
      code: 401,
      message: err.message || "Đăng ký không thành công",
    });
  }
};
