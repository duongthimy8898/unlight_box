import { internalAuthLogin } from "../../controllers/internal/auth.controller";
import {
  internalCheckRole,
  internalAuthMiddleware,
} from "../../middlewares/internal/auth.middleware";
import { InternalUserRole } from "../../entities/InternalUser.entity";
import { Router } from "express";

const internalAuthRouter = Router();

internalAuthRouter.post("/login", internalAuthLogin);

// Ví dụ route bảo vệ: chỉ ADMINISTRATOR mới vào được
internalAuthRouter.get(
  "/admin-only",
  internalAuthMiddleware,
  internalCheckRole([InternalUserRole.ADMINISTRATOR]),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

export default internalAuthRouter;
