import { replayRepo } from "../../db/repositories";

export const replayService = {
  async getAllReplays() {
    return await replayRepo.find({
      relations: ["sport"],
    });
  },

  async getReplay(by: "id" | "slug", value: string | number) {
    const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
    return await replayRepo.findOne({
      where,
      relations: ["sport"],
    });
  },
};
