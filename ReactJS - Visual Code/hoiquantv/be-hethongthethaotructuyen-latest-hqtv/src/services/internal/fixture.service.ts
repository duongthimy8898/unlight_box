import dotenv from "dotenv";
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });
import {
  fixtureRepo,
  sportRepo,
  leagueRepo,
  teamRepo,
  fixtureStatusRepo,
  internalUserRepo,
} from "../../db/repositories";
import { fromZonedTime } from "date-fns-tz";
import { In, IsNull } from "typeorm";
import { FixtureCommentator } from "../../entities/FixtureCommentator.entity";
import FixtureScore from "../../entities/FixtureScore.entity";
import FixtureStatus from "../../entities/FixtureStatus.entity";
import axios from "axios";
import slugGenerator from "slug";
import { nanoid } from "nanoid";

export const fixtureService = {
  /**
   * Lấy tất cả fixtures (luôn query DB)
   */
  async getAllFixtures() {
    return await fixtureRepo.find({
      relations: [
        "sport",
        "league",
        "homeTeam",
        "awayTeam",
        "score",
        "status",
        "fixtureCommentators",
        "fixtureCommentators.commentator",
      ],
      where: {
        status: IsNull(),
      },
    });
  },

  /**
   * Lấy fixture theo id hoặc slug
   */
  async getFixture(by: "id" | "slug", value: string | number) {
    const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
    return await fixtureRepo.findOne({
      where,
      relations: [
        "sport",
        "league",
        "homeTeam",
        "awayTeam",
        "score",
        "status",
        "fixtureCommentators",
        "fixtureCommentators.commentator",
      ],
    });
  },

  /**
   * Tạo mới fixture
   */
  async createFixture(payload: any) {
    const {
      referenceId,
      title,
      startTime,
      sportId,
      leagueId,
      homeTeamId,
      awayTeamId,
      commentatorIdsIdxs,
    } = payload;

    const slug = `${slugGenerator(title)}.${nanoid(10)}`;
    const startTimeToUtc = fromZonedTime(startTime, "Asia/Ho_Chi_Minh");

    const sport = await sportRepo.findOneBy({ id: sportId ?? -9999 });
    const league = await leagueRepo.findOneBy({ id: leagueId ?? -9999 });
    const homeTeam = await teamRepo.findOneBy({ id: homeTeamId ?? -9999 });
    const awayTeam = await teamRepo.findOneBy({ id: awayTeamId ?? -9999 });
    if (!sport || !league || !homeTeam || !awayTeam) {
      throw new Error("Invalid relation id");
    }

    const fixtureCommentators = commentatorIdsIdxs
      .split(",")
      .map((o: string) => {
        const [id, priority] = o.split(":");
        return { commentatorId: Number(id), priority: Number(priority) };
      });

    const validUsers = await internalUserRepo.find({
      where: { id: In(fixtureCommentators.map((fc: any) => fc.commentatorId)) },
    });

    const validIds = new Set(validUsers.map((u) => u.id));
    const validFixtureCommentators: FixtureCommentator[] = fixtureCommentators
      .filter((fc: any) => validIds.has(fc.commentatorId))
      .map((fc: any) => ({
        commentator: validUsers.find((u) => u.id === fc.commentatorId)!,
        priority: fc.priority,
      }));

    let chatChannelKeyId = null;
    const cboxApi =
      process.env.CBOX_API_URL ||
      "https://www.cbox.ws/apis/threads.php?id=5-960460-0V4sGi&key=c7ea97f4e01bfe5faa03f5c0d30a3471&act=mkthread";
    console.log("Creating chat channel via CBox API:", cboxApi);
    const responseCbox = await axios.get(cboxApi);
    console.log("CBox API response:", responseCbox.data);
    const dataCbox = responseCbox.data as string;
    console.log("CBox data:", dataCbox);
    const segs = dataCbox.trim().split(/\s+/);
    const cboxId = segs[1]?.trim();
    const cboxKey = segs[2]?.trim();
    if (cboxId && cboxKey) {
      chatChannelKeyId = `${cboxId}-${cboxKey}`;
    }

    const score = new FixtureScore();

    const fixture = fixtureRepo.create({
      referenceId,
      slug,
      title,
      startTime: startTimeToUtc,
      isLive: false,
      isPinned: false,
      isHot: false,
      sport,
      league,
      homeTeam,
      awayTeam,
      score,
      fixtureCommentators: validFixtureCommentators,
      chatChannelKeyId: chatChannelKeyId,
      status: null,
    });

    return await fixtureRepo.save(fixture);
  },

  /**
   * Cập nhật fixture
   */
  async updateFixture(id: number, payload: any) {
    const {
      title,
      startTime,
      sportId,
      leagueId,
      homeTeamId,
      awayTeamId,
      commentatorIdsIdxs,
      chatChannelKeyId,
    } = payload;

    const fixture = await fixtureRepo.findOne({
      where: { id },
      relations: [
        "sport",
        "league",
        "homeTeam",
        "awayTeam",
        "fixtureCommentators",
        "fixtureCommentators.commentator",
      ],
    });
    if (!fixture) return null;

    if (sportId !== undefined) {
      const sport = await sportRepo.findOneBy({ id: sportId });
      if (!sport) throw new Error("Invalid sportId");
      fixture.sport = sport;
    }
    if (leagueId !== undefined) {
      const league = await leagueRepo.findOneBy({ id: leagueId });
      if (!league) throw new Error("Invalid leagueId");
      fixture.league = league;
    }
    if (homeTeamId !== undefined) {
      const homeTeam = await teamRepo.findOneBy({ id: homeTeamId });
      if (!homeTeam) throw new Error("Invalid homeTeamId");
      fixture.homeTeam = homeTeam;
    }
    if (awayTeamId !== undefined) {
      const awayTeam = await teamRepo.findOneBy({ id: awayTeamId });
      if (!awayTeam) throw new Error("Invalid awayTeamId");
      fixture.awayTeam = awayTeam;
    }
    if (title !== undefined) {
      fixture.title = title;
      fixture.slug = `${slugGenerator(title)}.${nanoid(10)}`;
    }
    if (startTime !== undefined) {
      fixture.startTime = fromZonedTime(startTime, "Asia/Ho_Chi_Minh");
    }
    if (commentatorIdsIdxs !== undefined) {
      const fixtureCommentators = commentatorIdsIdxs
        .split(",")
        .map((o: string) => {
          const [id, priority] = o.split(":");
          return { commentatorId: Number(id), priority: Number(priority) };
        });

      const validUsers = await internalUserRepo.find({
        where: {
          id: In(fixtureCommentators.map((fc: any) => fc.commentatorId)),
        },
      });

      const validIds = new Set(validUsers.map((u) => u.id));
      fixture.fixtureCommentators = fixtureCommentators
        .filter((fc: any) => validIds.has(fc.commentatorId))
        .map((fc: any) => ({
          commentator: validUsers.find((u) => u.id === fc.commentatorId)!,
          priority: fc.priority,
        }));
    }

    fixture.chatChannelKeyId = chatChannelKeyId ?? fixture.chatChannelKeyId;

    return await fixtureRepo.save(fixture);
  },

  async updateAct(id: number, act: string) {
    const fixture = await fixtureRepo.findOneBy({ id });
    if (!fixture) return null;

    if (act === "pin") fixture.isPinned = true;
    else if (act === "unpin") fixture.isPinned = false;
    else if (act === "hot") fixture.isHot = true;
    else if (act === "unhot") fixture.isHot = false;
    else if (act === "live") fixture.isLive = true;
    else if (act === "unlive") fixture.isLive = false;

    return await fixtureRepo.save(fixture);
  },

  async doneFixture(id: number) {
    const fixture = await fixtureRepo.findOne({ where: { id } });
    if (!fixture) return null;

    fixture.isLive = false;
    let fixtureStatus = await fixtureStatusRepo.findOneBy({ code: "FT" });
    if (!fixtureStatus) {
      fixtureStatus = new FixtureStatus();
      fixtureStatus.code = "FT";
      fixtureStatus.description = "Full Time";
      await fixtureStatusRepo.save(fixtureStatus);
    }
    // fixture.referenceId = null;
    fixture.status = fixtureStatus;

    return await fixtureRepo.save(fixture);
  },

  async deleteFixture(id: number) {
    return await fixtureRepo.delete(id);
  },
};
