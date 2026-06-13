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
let FixtureStatus = class FixtureStatus {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FixtureStatus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "reference_id",
        type: "varchar",
        length: 255,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], FixtureStatus.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], FixtureStatus.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], FixtureStatus.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], FixtureStatus.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], FixtureStatus.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Fixture_entity_1.default, (fixture) => fixture.status),
    __metadata("design:type", Array)
], FixtureStatus.prototype, "fixtures", void 0);
FixtureStatus = __decorate([
    (0, typeorm_1.Entity)({ name: "fixture_statuses" })
], FixtureStatus);
exports.default = FixtureStatus;
