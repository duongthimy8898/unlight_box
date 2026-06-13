import { Router } from "express";
import internalRouter from "./internal";
import externalRouter from "./external";

const router = Router();

// mount từng nhóm route
router.use("/internal", internalRouter);
router.use("/external", externalRouter);
// router.use("/external/auth", externalAuthRoutes);

export default router;
