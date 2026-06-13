import { fixtureCommentatorRepo } from "../../db/repositories";

export const fixtureCommentatorService = {
  // Lấy tất cả
  async getAllFixtureCommentators() {
    return await fixtureCommentatorRepo.find({
      relations: ["commentator", "fixture"],
      order: { priority: "ASC" },
    });
  },

  // Lấy commentators theo fixtureId
  async getFixtureCommentators(fixtureId: number) {
    return await fixtureCommentatorRepo.find({
      where: { fixture: { id: fixtureId } },
      relations: ["commentator", "fixture"],
      order: { priority: "ASC" },
    });
  },
};
