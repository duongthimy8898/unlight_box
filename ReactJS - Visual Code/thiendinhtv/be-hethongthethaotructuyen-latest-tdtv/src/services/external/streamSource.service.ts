import { streamSourceRepo } from "../../db/repositories";

export const streamSourceService = {
  async getAllStreamSources() {
    return await streamSourceRepo.find({
      relations: ["commentator"],
    });
  },

  async getStreamSource(id: number) {
    return await streamSourceRepo.findOne({
      where: { id },
      relations: ["commentator"],
    });
  },
};
