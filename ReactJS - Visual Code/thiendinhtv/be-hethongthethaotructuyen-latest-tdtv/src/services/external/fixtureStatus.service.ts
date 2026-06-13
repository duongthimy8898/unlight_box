import { fixtureStatusRepo } from "../../db/repositories";

export const fixtureStatusService = {
  // Lấy tất cả
  async getAllFixtureStatuses() {
    return await fixtureStatusRepo.find();
  },

  // Lấy theo id
  async getFixtureStatus(id: number) {
    return await fixtureStatusRepo.findOneBy({ id });
  },
};
