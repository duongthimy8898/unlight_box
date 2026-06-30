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
const Fixture_entity_1 = __importDefault(require("./Fixture.entity"));
let League = class League {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], League.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "reference_id",
        type: "varchar",
        length: 255,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], League.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slug", unique: true }),
    __metadata("design:type", String)
], League.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sport_entity_1.default, (sport) => sport.leagues, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "sport_id" }),
    __metadata("design:type", Sport_entity_1.default)
], League.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "short_name",
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], League.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name" }),
    __metadata("design:type", String)
], League.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "logo_url",
        type: "varchar",
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", Object)
], League.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], League.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], League.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Fixture_entity_1.default, (fixture) => fixture.league),
    __metadata("design:type", Array)
], League.prototype, "fixtures", void 0);
League = __decorate([
    (0, typeorm_1.Entity)({ name: "leagues" }),
    (0, typeorm_1.Unique)(["sport", "name"]) // name + sport_id phải unique
    ,
    (0, typeorm_1.Unique)(["sport", "shortName"]) // shortName + sport_id phải unique
], League);
exports.default = League;
