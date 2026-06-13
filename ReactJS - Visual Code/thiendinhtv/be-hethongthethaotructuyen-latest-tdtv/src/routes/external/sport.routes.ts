// src/routes/sport.routes.ts
import { Router } from "express";
import {
  getAllSports,
  getSport,
} from "../../controllers/external/sport.controller";

const externalSportRouter = Router();

// Lấy tất cả
externalSportRouter.get("/", getAllSports);
// Lấy 1 bản ghi (query: ?by=id&value=1 hoặc ?by=slug&value=football)
externalSportRouter.get("/get", getSport);

export default externalSportRouter;
