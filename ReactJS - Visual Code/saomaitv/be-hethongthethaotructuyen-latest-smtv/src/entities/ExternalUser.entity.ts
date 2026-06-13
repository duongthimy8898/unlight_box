import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

enum ExternalUserRole {
  MEMBER = "member",
  MODERATOR = "moderator",
}

enum ExternalUserStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  BANNED = "banned",
  DEACTIVATED = "deactivated",
}

@Entity({ name: "external_users" }) // tên bảng trong MySQL
class ExternalUser {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "username", unique: true })
  username!: string;

  @Column({
    name: "phone_number",
    type: "varchar",
    length: 20,
    unique: true,
  })
  phoneNumber!: string;

  @Column({
    name: "email",
    type: "varchar",
    length: 100,
    unique: true,
    nullable: true,
  })
  email?: string | null;

  @Column({
    name: "name",
    type: "varchar",
    length: 50,
    unique: false,
    nullable: true,
  })
  name?: string | null;

  @Column({
    name: "nickname",
    type: "varchar",
    length: 50,
    unique: false,
    nullable: true,
  })
  nickname?: string | null;

  @Column({
    name: "bio",
    type: "varchar",
    length: 500,
    unique: false,
    nullable: true,
  })
  bio?: string | null;

  @Column({
    name: "avatar_url",
    type: "varchar",
    length: 500,
    unique: false,
    nullable: true,
  })
  avatarUrl?: string | null;

  @Column({
    name: "cover_url",
    type: "varchar",
    length: 500,
    unique: false,
    nullable: true,
  })
  coverUrl?: string | null;

  @Column({ name: "hashed_password" })
  hashedPassword!: string;

  @Column({
    name: "role",
    type: "enum",
    enum: ExternalUserRole,
    default: ExternalUserRole.MEMBER,
  })
  role!: ExternalUserRole;

  @Column({
    name: "status",
    type: "enum",
    enum: ExternalUserStatus,
    default: ExternalUserStatus.ACTIVE,
  })
  status!: ExternalUserStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}

export { ExternalUserRole, ExternalUserStatus };
export default ExternalUser;
