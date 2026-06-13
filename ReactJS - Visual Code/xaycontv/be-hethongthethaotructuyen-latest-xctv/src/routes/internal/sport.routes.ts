// src/routes/sport.routes.ts
import { Router } from "express";
import {
  getAllSports,
  createSport,
  updateSport,
  deleteSport,
  getSport,
} from "../../controllers/internal/sport.controller";

const internalSportRouter = Router();

// Lấy tất cả
internalSportRouter.get("/", getAllSports);

// Tạo mới
internalSportRouter.post("/create", createSport);

// Lấy 1 bản ghi (query: ?by=id&value=1 hoặc ?by=slug&value=football)
internalSportRouter.get("/get", getSport);

// Cập nhật (body: dữ liệu update, query: ?id=1 hoặc ?slug=football)
internalSportRouter.put("/update/:id", updateSport);

// Xóa (query: ?id=1 hoặc ?slug=football)
internalSportRouter.delete("/delete/:id", deleteSport);

export default internalSportRouter;
