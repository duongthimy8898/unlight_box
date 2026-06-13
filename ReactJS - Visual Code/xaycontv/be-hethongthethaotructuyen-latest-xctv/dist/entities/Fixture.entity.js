"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Sport_entity_1 = __importDefault(require("./Sport.entity"));
const League_entity_1 = __importDefault(require("./League.entity"));
const Team_entity_1 = __importDefault(require("./Team.entity"));
const FixtureStatus_entity_1 = __importDefault(require("./FixtureStatus.entity"));
const FixtureScore_entity_1 = __importDefault(require("./FixtureScore.entity"));
const FixtureCommentator_entity_1 = require("./FixtureCommentator.entity");
let Fixture = class Fixture {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Fixture.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "reference_id",
        type: "varchar",
        length: 255,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Fixture.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "chat_channel_key_id",
        type: "varchar",
        length: 255,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Fixture.prototype, "chatChannelKeyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slug", unique: true }),
    __metadata("design:type", String)
], Fixture.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sport_entity_1.default, (sport) => sport.fixtures, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "sport_id" }),
    __metadata("design:type", Sport_entity_1.default)
], Fixture.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => League_entity_1.default, (league) => league.fixtures, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "league_id" }),
    __metadata("design:type", League_entity_1.default)
], Fixture.prototype, "league", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Team_entity_1.default, (homeTeam) => homeTeam.homeFixtures, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "home_team_id" }),
    __metadata("design:type", Team_entity_1.default)
], Fixture.prototype, "homeTeam", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Team_entity_1.default, (awayTeam) => awayTeam.awayFixtures, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "away_team_id" }),
    __metadata("design:type", Team_entity_1.default)
], Fixture.prototype, "awayTeam", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title", unique: false }),
    __metadata("design:type", String)
], Fixture.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_time", type: "timestamp", precision: 6 }),
    __metadata("design:type", Date)
], Fixture.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FixtureCommentator_entity_1.FixtureCommentator, (fc) => fc.fixture, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Fixture.prototype, "fixtureCommentators", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "elapsed_time", nullable: true }),
    __metadata("design:type", Object)
], Fixture.prototype, "elapsedTime", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => FixtureScore_entity_1.default, (fixtureScore) => fixtureScore.fixture, {
        nullable: true,
        cascade: true, // khi save/remove Fixture thì cũng cascade sang FixtureScore
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "fixture_score_id" }),
    __metadata("design:type", Object)
], Fixture.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FixtureStatus_entity_1.default, (status) => status.fixtures, {
        nullable: true,
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)({ name: "fixture_status_id" }),
    __metadata("design:type", Object)
], Fixture.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "is_live",
        default: false,
    }),
    __metadata("design:type", Boolean)
], Fixture.prototype, "isLive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "is_pinned",
        default: false,
    }),
    __metadata("design:type", Boolean)
], Fixture.prototype, "isPinned", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "is_hot",
        default: false,
    }),
    __metadata("design:type", Boolean)
], Fixture.prototype, "isHot", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Fixture.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Fixture.prototype, "updatedAt", void 0);
Fixture = __decorate([
    (0, typeorm_1.Entity)({ name: "fixtures" }) // tên bảng trong MySQL
], Fixture);
exports.default = Fixture;
