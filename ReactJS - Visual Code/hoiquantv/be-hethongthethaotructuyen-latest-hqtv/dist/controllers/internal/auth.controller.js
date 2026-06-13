"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalAuthLogin = void 0;
const auth_service_1 = require("../../services/internal/auth.service");
const internalAuthLogin = async (req, res) => {
    try {
        const { identifier, rawPassword } = req.body;
        const authData = await auth_service_1.InternalAuthService.login(identifier, rawPassword);
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
exports.internalAuthLogin = internalAuthLogin;
