import { nanoid } from "nanoid";
import { sportRepo } from "../../db/repositories";
import slugGenerator from "slug";

export const sportService = {
  async getAllSports() {
    return await sportRepo.find({
      relations: [],
    });
  },

  async getSport(by: "id" | "slug", value: string | number) {
    const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
    return await sportRepo.findOne({
      where,
      relations: [],
    });
  },

  async createSport(payload: any) {
    payload.slug = `${slugGenerator(payload.name)}.${nanoid(10)}`;
    const sport = sportRepo.create(payload);
    return await sportRepo.save(sport);
  },

  async updateSport(id: number, payload: any) {
    let sport = await sportRepo.findOneBy({ id });
    if (!sport) return null;

    sportRepo.merge(sport, payload);
    return await sportRepo.save(sport);
  },

  async deleteSport(id: number) {
    return await sportRepo.delete(id);
  },
};
