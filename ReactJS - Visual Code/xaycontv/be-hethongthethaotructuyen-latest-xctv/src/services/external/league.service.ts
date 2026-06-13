import { leagueRepo } from "../../db/repositories";

export const leagueService = {
  async getAllLeagues() {
    return await leagueRepo.find({
      relations: ["sport"],
    });
  },

  async getLeague(by: "id" | "slug", value: string | number) {
    const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
    return await leagueRepo.findOne({
      where,
      relations: ["sport"],
    });
  },
};
