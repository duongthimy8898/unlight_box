"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const env = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${env}` });
const repositories_1 = require("../../db/repositories");
const date_fns_tz_1 = require("date-fns-tz");
const typeorm_1 = require("typeorm");
const FixtureScore_entity_1 = __importDefault(require("../../entities/FixtureScore.entity"));
const FixtureStatus_entity_1 = __importDefault(require("../../entities/FixtureStatus.entity"));
const axios_1 = __importDefault(require("axios"));
const slug_1 = __importDefault(require("slug"));
const nanoid_1 = require("nanoid");
exports.fixtureService = {
    /**
     * Lấy tất cả fixtures (luôn query DB)
     */
    async getAllFixtures() {
        return await repositories_1.fixtureRepo.find({
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
                status: (0, typeorm_1.IsNull)(),
            },
        });
    },
    /**
     * Lấy fixture theo id hoặc slug
     */
    async getFixture(by, value) {
        const where = by === "id" ? { id: Number(value) } : { slug: String(value) };
        return await repositories_1.fixtureRepo.findOne({
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
    async createFixture(payload) {
        const { referenceId, title, startTime, sportId, leagueId, homeTeamId, awayTeamId, commentatorIdsIdxs, } = payload;
        const slug = `${(0, slug_1.default)(title)}.${(0, nanoid_1.nanoid)(10)}`;
        const startTimeToUtc = (0, date_fns_tz_1.fromZonedTime)(startTime, "Asia/Ho_Chi_Minh");
        const sport = await repositories_1.sportRepo.findOneBy({ id: sportId ?? -9999 });
        const league = await repositories_1.leagueRepo.findOneBy({ id: leagueId ?? -9999 });
        const homeTeam = await repositories_1.teamRepo.findOneBy({ id: homeTeamId ?? -9999 });
        const awayTeam = await repositories_1.teamRepo.findOneBy({ id: awayTeamId ?? -9999 });
        if (!sport || !league || !homeTeam || !awayTeam) {
            throw new Error("Invalid relation id");
        }
        const fixtureCommentators = commentatorIdsIdxs
            .split(",")
            .map((o) => {
            const [id, priority] = o.split(":");
            return { commentatorId: Number(id), priority: Number(priority) };
        });
        const validUsers = await repositories_1.internalUserRepo.find({
            where: { id: (0, typeorm_1.In)(fixtureCommentators.map((fc) => fc.commentatorId)) },
        });
        const validIds = new Set(validUsers.map((u) => u.id));
        const validFixtureCommentators = fixtureCommentators
            .filter((fc) => validIds.has(fc.commentatorId))
            .map((fc) => ({
            commentator: validUsers.find((u) => u.id === fc.commentatorId),
            priority: fc.priority,
        }));
        let chatChannelKeyId = null;
        const cboxApi = process.env.CBOX_API_URL ||
            "https://www.cbox.ws/apis/threads.php?id=5-962707-YqPAde&key=ec7601053aca5361ab407c22c70feafb&act=mkthread";
        console.log("Creating chat channel via CBox API:", cboxApi);
        const responseCbox = await axios_1.default.get(cboxApi);
        console.log("CBox API response:", responseCbox.data);
        const dataCbox = responseCbox.data;
        console.log("CBox data:", dataCbox);
        const segs = dataCbox.trim().split(/\s+/);
        const cboxId = segs[1]?.trim();
        const cboxKey = segs[2]?.trim();
        if (cboxId && cboxKey) {
            chatChannelKeyId = `${cboxId}-${cboxKey}`;
        }
        const score = new FixtureScore_entity_1.default();
        const fixture = repositories_1.fixtureRepo.create({
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
        return await repositories_1.fixtureRepo.save(fixture);
    },
    /**
     * Cập nhật fixture
     */
    async updateFixture(id, payload) {
        const { title, startTime, sportId, leagueId, homeTeamId, awayTeamId, commentatorIdsIdxs, chatChannelKeyId, } = payload;
        const fixture = await repositories_1.fixtureRepo.findOne({
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
        if (!fixture)
            return null;
        if (sportId !== undefined) {
            const sport = await repositories_1.sportRepo.findOneBy({ id: sportId });
            if (!sport)
                throw new Error("Invalid sportId");
            fixture.sport = sport;
        }
        if (leagueId !== undefined) {
            const league = await repositories_1.leagueRepo.findOneBy({ id: leagueId });
            if (!league)
                throw new Error("Invalid leagueId");
            fixture.league = league;
        }
        if (homeTeamId !== undefined) {
            const homeTeam = await repositories_1.teamRepo.findOneBy({ id: homeTeamId });
            if (!homeTeam)
                throw new Error("Invalid homeTeamId");
            fixture.homeTeam = homeTeam;
        }
        if (awayTeamId !== undefined) {
            const awayTeam = await repositories_1.teamRepo.findOneBy({ id: awayTeamId });
            if (!awayTeam)
                throw new Error("Invalid awayTeamId");
            fixture.awayTeam = awayTeam;
        }
        if (title !== undefined) {
            fixture.title = title;
            fixture.slug = `${(0, slug_1.default)(title)}.${(0, nanoid_1.nanoid)(10)}`;
        }
        if (startTime !== undefined) {
            fixture.startTime = (0, date_fns_tz_1.fromZonedTime)(startTime, "Asia/Ho_Chi_Minh");
        }
        if (commentatorIdsIdxs !== undefined) {
            const fixtureCommentators = commentatorIdsIdxs
                .split(",")
                .map((o) => {
                const [id, priority] = o.split(":");
                return { commentatorId: Number(id), priority: Number(priority) };
            });
            const validUsers = await repositories_1.internalUserRepo.find({
                where: {
                    id: (0, typeorm_1.In)(fixtureCommentators.map((fc) => fc.commentatorId)),
                },
            });
            const validIds = new Set(validUsers.map((u) => u.id));
            fixture.fixtureCommentators = fixtureCommentators
                .filter((fc) => validIds.has(fc.commentatorId))
                .map((fc) => ({
                commentator: validUsers.find((u) => u.id === fc.commentatorId),
                priority: fc.priority,
            }));
        }
        fixture.chatChannelKeyId = chatChannelKeyId ?? fixture.chatChannelKeyId;
        return await repositories_1.fixtureRepo.save(fixture);
    },
    async updateAct(id, act) {
        const fixture = await repositories_1.fixtureRepo.findOneBy({ id });
        if (!fixture)
            return null;
        if (act === "pin")
            fixture.isPinned = true;
        else if (act === "unpin")
            fixture.isPinned = false;
        else if (act === "hot")
            fixture.isHot = true;
        else if (act === "unhot")
            fixture.isHot = false;
        else if (act === "live")
            fixture.isLive = true;
        else if (act === "unlive")
            fixture.isLive = false;
        return await repositories_1.fixtureRepo.save(fixture);
    },
    async doneFixture(id) {
        const fixture = await repositories_1.fixtureRepo.findOne({ where: { id } });
        if (!fixture)
            return null;
        fixture.isLive = false;
        let fixtureStatus = await repositories_1.fixtureStatusRepo.findOneBy({ code: "FT" });
        if (!fixtureStatus) {
            fixtureStatus = new FixtureStatus_entity_1.default();
            fixtureStatus.code = "FT";
            fixtureStatus.description = "Full Time";
            await repositories_1.fixtureStatusRepo.save(fixtureStatus);
        }
        // fixture.referenceId = null;
        fixture.status = fixtureStatus;
        return await repositories_1.fixtureRepo.save(fixture);
    },
    async deleteFixture(id) {
        return await repositories_1.fixtureRepo.delete(id);
    },
};
