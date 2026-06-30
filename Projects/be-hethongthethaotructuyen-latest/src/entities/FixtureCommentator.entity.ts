// entities/FixtureCommentator.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Fixture from "./Fixture.entity";
import InternalUser from "./InternalUser.entity";
@Entity({ name: "fixture_commentators" })
export class FixtureCommentator {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Fixture, (fixture) => fixture.fixtureCommentators, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "fixture_id" })
  fixture!: Fixture;

  @ManyToOne(
    () => InternalUser,
    (commentator) => commentator.fixtureCommentators,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "commentator_id" })
  commentator!: InternalUser;

  @Column({ type: "int", default: 0 })
  priority!: number; // thứ tự ưu tiên
}
