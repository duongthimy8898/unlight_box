import { streamSourceRepo, internalUserRepo } from "../../db/repositories";

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

  async createStreamSource(payload: {
    commentatorId: number;
    priority?: number;
    name: string;
    sourceUrl: string;
  }) {
    const commentator = await internalUserRepo.findOneBy({
      id: payload.commentatorId ?? -9999,
    });
    if (!commentator) throw new Error("Invalid commentatorId");

    const newSource = streamSourceRepo.create({
      commentator,
      priority: payload.priority ?? 0,
      name: payload.name,
      sourceUrl: payload.sourceUrl,
    });

    return await streamSourceRepo.save(newSource);
  },

  async updateStreamSource(id: number, payload: any) {
    let source = await streamSourceRepo.findOne({
      where: { id },
      relations: ["commentator"],
    });
    if (!source) return null;

    const { commentatorId, ...data } = payload;

    if (commentatorId) {
      const commentator = await internalUserRepo.findOneBy({
        id: commentatorId ?? -9999,
      });
      if (!commentator) throw new Error("Invalid commentatorId");
      source.commentator = commentator;
    }

    streamSourceRepo.merge(source, data);
    return await streamSourceRepo.save(source);
  },

  async deleteStreamSource(id: number) {
    return await streamSourceRepo.delete(id);
  },
};
