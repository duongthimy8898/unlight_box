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
const InternalUser_entity_1 = __importDefault(require("./InternalUser.entity"));
let StreamSource = class StreamSource {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], StreamSource.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InternalUser_entity_1.default, (commentator) => commentator.streams, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "commentator_id" }),
    __metadata("design:type", InternalUser_entity_1.default)
], StreamSource.prototype, "commentator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "priority", unique: false, default: 0 }),
    __metadata("design:type", Number)
], StreamSource.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", unique: false }),
    __metadata("design:type", String)
], StreamSource.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "source_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: false,
    }),
    __metadata("design:type", String)
], StreamSource.prototype, "sourceUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], StreamSource.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], StreamSource.prototype, "updatedAt", void 0);
StreamSource = __decorate([
    (0, typeorm_1.Entity)({ name: "stream_sources" }) // tên bảng trong MySQL
], StreamSource);
exports.default = StreamSource;
