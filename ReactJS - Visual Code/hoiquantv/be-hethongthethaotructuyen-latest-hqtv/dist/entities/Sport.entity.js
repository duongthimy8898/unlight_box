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
const League_entity_1 = __importDefault(require("./League.entity"));
const Team_entity_1 = __importDefault(require("./Team.entity"));
const Fixture_entity_1 = __importDefault(require("./Fixture.entity"));
const Replay_entity_1 = __importDefault(require("./Replay.entity"));
let Sport = class Sport {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Sport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "reference_id",
        type: "varchar",
        length: 255,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Sport.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slug", unique: true }),
    __metadata("design:type", String)
], Sport.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "priority", unique: false }),
    __metadata("design:type", Number)
], Sport.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", unique: true }),
    __metadata("design:type", String)
], Sport.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "icon_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Sport.prototype, "iconUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "background_card_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", String)
], Sport.prototype, "backgroundCardUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "background_main_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", String)
], Sport.prototype, "backgroundMainUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "poster_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Sport.prototype, "posterUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Sport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Sport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => League_entity_1.default, (league) => league.sport),
    __metadata("design:type", Array)
], Sport.prototype, "leagues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Team_entity_1.default, (team) => team.sport),
    __metadata("design:type", Array)
], Sport.prototype, "teams", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Fixture_entity_1.default, (fixture) => fixture.sport),
    __metadata("design:type", Array)
], Sport.prototype, "fixtures", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Replay_entity_1.default, (replay) => replay.sport),
    __metadata("design:type", Array)
], Sport.prototype, "replays", void 0);
Sport = __decorate([
    (0, typeorm_1.Entity)({ name: "sports" }) // tên bảng trong MySQL
], Sport);
exports.default = Sport;
