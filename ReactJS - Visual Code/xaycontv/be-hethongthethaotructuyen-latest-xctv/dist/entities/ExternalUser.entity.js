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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalUserStatus = exports.ExternalUserRole = void 0;
const typeorm_1 = require("typeorm");
var ExternalUserRole;
(function (ExternalUserRole) {
    ExternalUserRole["MEMBER"] = "member";
    ExternalUserRole["MODERATOR"] = "moderator";
})(ExternalUserRole || (exports.ExternalUserRole = ExternalUserRole = {}));
var ExternalUserStatus;
(function (ExternalUserStatus) {
    ExternalUserStatus["ACTIVE"] = "active";
    ExternalUserStatus["SUSPENDED"] = "suspended";
    ExternalUserStatus["BANNED"] = "banned";
    ExternalUserStatus["DEACTIVATED"] = "deactivated";
})(ExternalUserStatus || (exports.ExternalUserStatus = ExternalUserStatus = {}));
let ExternalUser = class ExternalUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], ExternalUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "username", unique: true }),
    __metadata("design:type", String)
], ExternalUser.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "phone_number",
        type: "varchar",
        length: 20,
        unique: true,
    }),
    __metadata("design:type", String)
], ExternalUser.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "email",
        type: "varchar",
        length: 100,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ExternalUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "name",
        type: "varchar",
        length: 50,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ExternalUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "nickname",
        type: "varchar",
        length: 50,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ExternalUser.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "bio",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ExternalUser.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "avatar_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ExternalUser.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "cover_url",
        type: "varchar",
        length: 500,
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ExternalUser.prototype, "coverUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "hashed_password" }),
    __metadata("design:type", String)
], ExternalUser.prototype, "hashedPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "role",
        type: "enum",
        enum: ExternalUserRole,
        default: ExternalUserRole.MEMBER,
    }),
    __metadata("design:type", String)
], ExternalUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "status",
        type: "enum",
        enum: ExternalUserStatus,
        default: ExternalUserStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], ExternalUser.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], ExternalUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], ExternalUser.prototype, "updatedAt", void 0);
ExternalUser = __decorate([
    (0, typeorm_1.Entity)({ name: "external_users" }) // tên bảng trong MySQL
], ExternalUser);
exports.default = ExternalUser;
