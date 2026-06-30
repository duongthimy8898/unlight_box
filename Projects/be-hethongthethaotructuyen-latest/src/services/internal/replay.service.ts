import { nanoid } from "nanoid";
import { replayRepo, sportRepo } from "../../db/repositories";
import slugGenerator from "slug";

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

  async createReplay(payload: any) {
    payload.slug = `${slugGenerator(payload.name)}.${nanoid(10)}`;

    const sport = await sportRepo.findOneBy({ id: payload.sportId ?? -9999 });
    if (!sport) throw new Error("Invalid sportId");

    const replay = replayRepo.create({
      ...payload,
      sport,
    });
    return await replayRepo.save(replay);
  },

  async updateReplay(id: number, payload: any) {
    let replay = await replayRepo.findOne({
      where: { id },
      relations: ["sport"],
    });
    if (!replay) return null;

    replayRepo.merge(replay, payload);
    return await replayRepo.save(replay);
  },

  async deleteReplay(id: number) {
    return await replayRepo.delete(id);
  },
};
