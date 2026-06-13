import { teamRepo } from "../../db/repositories";

export const teamService = {
  async getAllTeams() {
    return await teamRepo.find({
      relations: ["sport"],
    });
  },

  async getTeam(by: "id" | "slug", value: string | number) {
    const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
    return await teamRepo.findOne({
      where,
      relations: ["sport"],
    });
  },
};
