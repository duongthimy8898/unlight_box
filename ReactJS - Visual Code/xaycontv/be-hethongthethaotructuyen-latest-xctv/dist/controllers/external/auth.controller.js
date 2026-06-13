"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalAuthRegister = exports.externalAuthLogin = void 0;
const auth_service_1 = require("../../services/external/auth.service");
const externalAuthLogin = async (req, res) => {
    try {
        const { identifier, rawPassword } = req.body;
        const authData = await auth_service_1.ExternalAuthService.login(identifier, rawPassword);
        res.json({
            code: 200,
            message: "Đăng nhập thành công",
            data: authData,
        });
    }
    catch (err) {
        res.status(401).json({
            code: 401,
            message: err.message || "Đăng nhập không thành công",
        });
    }
};
exports.externalAuthLogin = externalAuthLogin;
const externalAuthRegister = async (req, res) => {
    try {
        const { username, phoneNumber, name, rawPassword } = req.body;
        const authData = await auth_service_1.ExternalAuthService.register(username, phoneNumber, name, rawPassword);
        res.status(201).json({
            code: 201,
            message: "Đăng ký tài khoản thành công",
            data: authData,
        });
    }
    catch (err) {
        res.status(401).json({
            code: 401,
            message: err.message || "Đăng ký không thành công",
        });
    }
};
exports.externalAuthRegister = externalAuthRegister;
