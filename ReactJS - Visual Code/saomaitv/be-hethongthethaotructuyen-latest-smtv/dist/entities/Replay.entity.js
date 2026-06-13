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
let Replay = class Replay {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Replay.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slug", unique: true }),
    __metadata("design:type", String)
], Replay.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sport_entity_1.default, (sport) => sport.leagues, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "sport_id" }),
    __metadata("design:type", Sport_entity_1.default)
], Replay.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "title" }),
    __metadata("design:type", String)
], Replay.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "thumbnail_url",
        type: "varchar",
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Replay.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "video_source_url",
        type: "varchar",
        length: 500,
    }),
    __metadata("design:type", String)
], Replay.prototype, "videoSourceUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Replay.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Replay.prototype, "updatedAt", void 0);
Replay = __decorate([
    (0, typeorm_1.Entity)({ name: "replays" })
], Replay);
exports.default = Replay;
