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
exports.InternalUserStatus = exports.InternalUserRole = void 0;
const typeorm_1 = require("typeorm");
const FixtureCommentator_entity_1 = require("./FixtureCommentator.entity");
const StreamSource_entity_1 = __importDefault(require("./StreamSource.entity"));
var InternalUserRole;
(function (InternalUserRole) {
    InternalUserRole["ADMINISTRATOR"] = "administrator";
    InternalUserRole["SCHEDULER"] = "scheduler";
    InternalUserRole["COMMENTATOR"] = "commentator";
})(InternalUserRole || (exports.InternalUserRole = InternalUserRole = {}));
var InternalUserStatus;
(function (InternalUserStatus) {
    InternalUserStatus["ACTIVE"] = "active";
    InternalUserStatus["SUSPENDED"] = "suspended";
    InternalUserStatus["BANNED"] = "banned";
    InternalUserStatus["DEACTIVATED"] = "deactivated";
})(InternalUserStatus || (exports.InternalUserStatus = InternalUserStatus = {}));
let InternalUser = class InternalUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], InternalUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "username", unique: true }),
    __metadata("design:type", String)
], InternalUser.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hashed_password" }),
    __metadata("design:type", String)
], InternalUser.prototype, "hashedPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "email",
        type: "varchar",
        length: 100,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InternalUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "phone_number",
        type: "varchar",
        length: 20,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InternalUser.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "name",
        type: "varchar",
        length: 50,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InternalUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "nickname",
        type: "varchar",
        length: 50,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InternalUser.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "bio",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InternalUser.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "avatar_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InternalUser.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "cover_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InternalUser.prototype, "coverUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "role",
        type: "enum",
        enum: InternalUserRole,
        default: InternalUserRole.COMMENTATOR,
    }),
    __metadata("design:type", String)
], InternalUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "status",
        type: "enum",
        enum: InternalUserStatus,
        default: InternalUserStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], InternalUser.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], InternalUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], InternalUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "chat_channel_key_id",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InternalUser.prototype, "chatChannelKeyId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FixtureCommentator_entity_1.FixtureCommentator, (fc) => fc.commentator),
    __metadata("design:type", Array)
], InternalUser.prototype, "fixtureCommentators", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StreamSource_entity_1.default, (streamSource) => streamSource.commentator, {
        eager: true,
    }),
    __metadata("design:type", Array)
], InternalUser.prototype, "streams", void 0);
InternalUser = __decorate([
    (0, typeorm_1.Entity)({ name: "internal_users" }) // tên bảng trong MySQL
], InternalUser);
exports.default = InternalUser;
