// src/utils/response.ts
import { Response } from "express";

export const successResponse = (
  res: Response,
  code: number,
  message: string,
  data?: any
) => {
  return res.status(code).json({
    success: true,
    code,
    message,
    data: data ?? null,
  });
};

export const errorResponse = (
  res: Response,
  code: number,
  message: string,
  errorDetail?: any
) => {
  return res.status(code).json({
    success: false,
    code,
    message,
    error_detail: errorDetail ?? null,
  });
};
