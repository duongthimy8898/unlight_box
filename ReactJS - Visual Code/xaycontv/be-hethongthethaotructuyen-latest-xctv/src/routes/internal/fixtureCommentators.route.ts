import { Router } from "express";
import {
  getFixtureCommentators,
  addFixtureCommentator,
  updateFixtureCommentator,
  deleteFixtureCommentator,
} from "../../controllers/internal/fixtureCommentators.controller";

const internalFixtureCommentatorRouter = Router();

// Lấy tất cả commentators của 1 fixture
internalFixtureCommentatorRouter.get("/:fixtureId", getFixtureCommentators);

// Thêm commentator vào fixture
internalFixtureCommentatorRouter.post("/:fixtureId/add", addFixtureCommentator);

// Cập nhật priority hoặc thông tin mapping
internalFixtureCommentatorRouter.put("/update/:id", updateFixtureCommentator);

// Xóa commentator khỏi fixture
internalFixtureCommentatorRouter.delete(
  "/delete/:id",
  deleteFixtureCommentator
);

export default internalFixtureCommentatorRouter;
