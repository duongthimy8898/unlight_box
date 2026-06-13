import { fixtureScoreRepo, fixtureRepo } from "../../db/repositories";

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

  // Tạo mới
  async createFixtureScore(payload: any) {
    const { fixtureId, home, away } = payload;

    const fixture = await fixtureRepo.findOneBy({ id: fixtureId ?? -9999 });
    if (!fixture) throw new Error("Invalid fixtureId");

    const score = fixtureScoreRepo.create({
      home: home ?? 0,
      away: away ?? 0,
      fixture,
    });
    return await fixtureScoreRepo.save(score);
  },

  // Cập nhật
  async updateFixtureScore(id: number, payload: any) {
    let score = await fixtureScoreRepo.findOneBy({ id });
    if (!score) return null;

    fixtureScoreRepo.merge(score, payload);
    return await fixtureScoreRepo.save(score);
  },

  // Xóa
  async deleteFixtureScore(id: number) {
    return await fixtureScoreRepo.delete(id);
  },
};
