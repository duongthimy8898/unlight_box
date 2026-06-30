import { fixtureScoreRepo } from "../../db/repositories";

export const fixtureScoreService = {
  // Lấy tất cả
  async getAllFixtureScores() {
    return await fixtureScoreRepo.find({ relations: ["fixture"] });
  },

  // Lấy theo id
  async getFixtureScore(id: number) {
    return await fixtureScoreRepo.findOne({
      where: { id },
      relations: ["fixture"],
    });
  },
};
