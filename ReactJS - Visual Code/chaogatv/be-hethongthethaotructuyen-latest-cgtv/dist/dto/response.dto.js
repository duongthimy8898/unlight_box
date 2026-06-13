"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, code, message, data) => {
    return res.status(code).json({
        success: true,
        code,
        message,
        data: data ?? null,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, code, message, errorDetail) => {
    return res.status(code).json({
        success: false,
        code,
        message,
        error_detail: errorDetail ?? null,
    });
};
exports.errorResponse = errorResponse;
