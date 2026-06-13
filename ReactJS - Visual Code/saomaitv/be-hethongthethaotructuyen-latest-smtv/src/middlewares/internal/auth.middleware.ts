import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { InternalUserRole } from "../../entities/InternalUser.entity";

export const internalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    (req as any).user = decoded; // gắn vào req
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const internalCheckRole = (roles: InternalUserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};
