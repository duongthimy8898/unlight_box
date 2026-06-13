import { fixtureRepo } from "../../db/repositories";
import { In, IsNull } from "typeorm";

export const fixtureService = {
  /**
   * Lấy tất cả fixtures (luôn query DB)
   */
  async getAllFixtures() {
    return await fixtureRepo.find({
      relations: ["sport", "league", "homeTeam", "awayTeam", "score", "status", "fixtureCommentators", "fixtureCommentators.commentator"],
    });
  },

  /**
   * Lấy tất cả unfinished fixtures (luôn query DB) ["TBD", "NS", "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"]
   */
  async getUnfinishedFixtures() {
    return await fixtureRepo.find({
      where: [
        { status: IsNull() },
        {
          status: {
            code: In(["TBD", "NS", "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"]),
          },
        },
      ],
      relations: ["sport", "league", "homeTeam", "awayTeam", "score", "status", "fixtureCommentators", "fixtureCommentators.commentator"],
    });
  },

  /**
   * Lấy 100 finished fixtures (luôn query DB) ["FT", "AET", "PEN"]
   */
  async getFinishedFixtures() {
    return await fixtureRepo.find({
      where: { status: { code: In(["FT", "AET", "PEN"]) } },
      relations: ["sport", "league", "homeTeam", "awayTeam", "score", "status", "fixtureCommentators", "fixtureCommentators.commentator"],
    });
  },

  /**
   * Lấy fixture theo id hoặc slug
   */
  async getFixture(by: "id" | "slug", value: string | number) {
    const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
    return await fixtureRepo.findOne({
      where,
      relations: ["sport", "league", "homeTeam", "awayTeam", "score", "status", "fixtureCommentators", "fixtureCommentators.commentator"],
    });
  },
};
