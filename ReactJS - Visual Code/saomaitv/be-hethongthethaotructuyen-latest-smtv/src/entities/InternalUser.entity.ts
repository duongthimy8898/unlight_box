import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FixtureCommentator } from "./FixtureCommentator.entity";
import StreamSource from "./StreamSource.entity";

enum InternalUserRole {
  ADMINISTRATOR = "administrator",
  SCHEDULER = "scheduler",
  COMMENTATOR = "commentator",
}

enum InternalUserStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  BANNED = "banned",
  DEACTIVATED = "deactivated",
}

@Entity({ name: "internal_users" }) // tên bảng trong MySQL
class InternalUser {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "username", unique: true })
  username!: string;

  @Column({ name: "hashed_password" })
  hashedPassword!: string;

  @Column({
    name: "email",
    type: "varchar",
    length: 100,
    unique: true,
    nullable: true,
  })
  email?: string | null;

  @Column({
    name: "phone_number",
    type: "varchar",
    length: 20,
    unique: true,
    nullable: true,
  })
  phoneNumber?: string | null;

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

  @Column({
    name: "role",
    type: "enum",
    enum: InternalUserRole,
    default: InternalUserRole.COMMENTATOR,
  })
  role!: InternalUserRole;

  @Column({
    name: "status",
    type: "enum",
    enum: InternalUserStatus,
    default: InternalUserStatus.ACTIVE,
  })
  status!: InternalUserStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => FixtureCommentator, (fc) => fc.commentator)
  fixtureCommentators!: FixtureCommentator[];

  @OneToMany(() => StreamSource, (streamSource) => streamSource.commentator, {
    eager: true,
  })
  streams!: StreamSource[];
}

export { InternalUserRole, InternalUserStatus };
export default InternalUser;
