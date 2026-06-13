import { nanoid } from "nanoid";
import { leagueRepo, sportRepo } from "../../db/repositories";
import slugGenerator from "slug";

export const leagueService = {
  async getAllLeagues() {
    return await leagueRepo.find({
      relations: ["sport"],
    });
  },

  async getLeague(
    by: "id" | "slug" | "name" | "referenceId",
    value: string | number
  ) {
    let where: any;

    switch (by) {
      case "id":
        where = { id: Number(value) };
        break;

      case "referenceId":
        where = { referenceId: Number(value) };
        break;

      case "slug":
        where = { slug: String(value) };
        break;

      case "name":
        where = { name: String(value) };
        break;

      default:
        throw new Error("Invalid search field");
    }

    return await leagueRepo.findOne({
      where,
      relations: ["sport"],
    });
  },

  async createLeague(payload: any) {
    payload.slug = `${slugGenerator(payload.name)}.${nanoid(10)}`;

    const sport = await sportRepo.findOneBy({ id: payload.sportId ?? -9999 });
    if (!sport) throw new Error("Invalid sportId");

    const league = leagueRepo.create({
      ...payload,
      sport,
    });
    return await leagueRepo.save(league);
  },

  async updateLeague(id: number, payload: any) {
    let league = await leagueRepo.findOne({
      where: { id },
      relations: ["sport"],
    });
    if (!league) return null;

    leagueRepo.merge(league, payload);
    return await leagueRepo.save(league);
  },

  async deleteLeague(id: number) {
    return await leagueRepo.delete(id);
  },
};
