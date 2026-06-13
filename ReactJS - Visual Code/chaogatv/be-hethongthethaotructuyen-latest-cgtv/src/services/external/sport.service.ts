import { sportRepo } from "../../db/repositories";

export const sportService = {
  async getAllSports() {
    return await sportRepo
      .createQueryBuilder("sport")

      // Đếm số fixture chưa FT
      .loadRelationCountAndMap("sport.fixtureCount", "sport.fixtures", "fixture", (qb) =>
        qb.leftJoin("fixture.status", "status").where("status.code IS NULL OR status.code != :code", {
          code: "FT",
        }),
      )

      // Đếm số fixture đang LIVE + status IS NULL
      .loadRelationCountAndMap("sport.liveFixtureCount", "sport.fixtures", "liveFixture", (qb) =>
        qb.leftJoin("liveFixture.status", "liveStatus").where("liveFixture.isLive = :live", { live: true }).andWhere("liveStatus.id IS NULL"),
      )

      .getMany()
      .then((sports) =>
        sports.map((s) => ({
          ...s,
          hasLive: (s as any).liveFixtureCount > 0,
        })),
      );
  },
  async getSport(by: "id" | "slug", value: string | number) {
    const where = by === "id" ? { id: Number(value) } : { slug: String(value) };

    const sport = await sportRepo
      .createQueryBuilder("sport")
      .where(where)
      // đếm số fixture chưa FT
      .loadRelationCountAndMap("sport.fixtureCount", "sport.fixtures", "fixture", (qb) =>
        qb.leftJoin("fixture.status", "status").where("status.code IS NULL OR status.code != :code", {
          code: "FT",
        }),
      )
      // đếm số fixture đang LIVE
      .loadRelationCountAndMap("sport.liveFixtureCount", "sport.fixtures", "liveFixture", (qb) => qb.where("liveFixture.isLive = :live", { live: true }))
      .getOne();

    if (!sport) return null;

    // thêm field isLive dựa trên liveFixtureCount
    return {
      ...sport,
      hasLive: (sport as any).liveFixtureCount > 0,
    };
  },
};
