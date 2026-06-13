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

  // Tạo mới
  async createFixtureStatus(payload: { code: string; description: string }) {
    if (!payload.description) {
      throw new Error("Description is required");
    }

    const status = fixtureStatusRepo.create(payload);
    return await fixtureStatusRepo.save(status);
  },

  // Cập nhật
  async updateFixtureStatus(id: number, payload: any) {
    let status = await fixtureStatusRepo.findOneBy({ id });
    if (!status) return null;

    fixtureStatusRepo.merge(status, payload);
    return await fixtureStatusRepo.save(status);
  },

  // Xoá
  async deleteFixtureStatus(id: number) {
    return await fixtureStatusRepo.delete(id);
  },
};
