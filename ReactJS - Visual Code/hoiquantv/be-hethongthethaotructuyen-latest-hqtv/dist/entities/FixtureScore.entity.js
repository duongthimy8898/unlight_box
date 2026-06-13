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
const Fixture_entity_1 = __importDefault(require("./Fixture.entity"));
let FixtureScore = class FixtureScore {
    constructor() {
        this.home = 0; // map với client.home
        this.away = 0; // map với client.away
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FixtureScore.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], FixtureScore.prototype, "home", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], FixtureScore.prototype, "away", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], FixtureScore.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], FixtureScore.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Fixture_entity_1.default, (fixture) => fixture.score, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Fixture_entity_1.default)
], FixtureScore.prototype, "fixture", void 0);
FixtureScore = __decorate([
    (0, typeorm_1.Entity)({ name: "fixture_scores" })
], FixtureScore);
exports.default = FixtureScore;
