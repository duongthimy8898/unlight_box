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
exports.FixtureCommentator = void 0;
// entities/FixtureCommentator.ts
const typeorm_1 = require("typeorm");
const Fixture_entity_1 = __importDefault(require("./Fixture.entity"));
const InternalUser_entity_1 = __importDefault(require("./InternalUser.entity"));
let FixtureCommentator = class FixtureCommentator {
};
exports.FixtureCommentator = FixtureCommentator;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FixtureCommentator.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Fixture_entity_1.default, (fixture) => fixture.fixtureCommentators, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "fixture_id" }),
    __metadata("design:type", Fixture_entity_1.default)
], FixtureCommentator.prototype, "fixture", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InternalUser_entity_1.default, (commentator) => commentator.fixtureCommentators, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "commentator_id" }),
    __metadata("design:type", InternalUser_entity_1.default)
], FixtureCommentator.prototype, "commentator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], FixtureCommentator.prototype, "priority", void 0);
exports.FixtureCommentator = FixtureCommentator = __decorate([
    (0, typeorm_1.Entity)({ name: "fixture_commentators" })
], FixtureCommentator);
