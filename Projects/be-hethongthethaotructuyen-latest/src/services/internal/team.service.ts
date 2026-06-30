import { nanoid } from "nanoid";
import { teamRepo, sportRepo } from "../../db/repositories";
import slugGenerator from "slug";

export const teamService = {
  async getAllTeams() {
    return await teamRepo
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.sport", "sport")
      .select("team") // lấy tất cả cột của team
      .addSelect(["sport.id", "sport.slug", "sport.name"])
      .getMany();
  },

  async getTeam(by: "id" | "slug", value: string | number) {
    const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
    return await teamRepo.findOne({
      where,
      relations: ["sport"],
    });
  },

  async createTeam(payload: any) {
    payload.slug = `${slugGenerator(payload.name)}.${nanoid(10)}`;

    const sport = await sportRepo.findOneBy({ id: payload.sportId ?? -9999 });
    if (!sport) throw new Error("Invalid sportId");

    const team = teamRepo.create({ ...payload, sport });
    return await teamRepo.save(team);
  },

  async updateTeam(id: number, payload: any) {
    let team = await teamRepo.findOne({ where: { id }, relations: ["sport"] });
    if (!team) return null;

    teamRepo.merge(team, payload);
    return await teamRepo.save(team);
  },

  async deleteTeam(id: number) {
    return await teamRepo.delete(id);
  },
};
