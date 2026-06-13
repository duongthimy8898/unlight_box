import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import Fixture from "./Fixture.entity";

@Entity({ name: "fixture_scores" })
class FixtureScore {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", default: 0 })
  home: number = 0; // map với client.home

  @Column({ type: "int", default: 0 })
  away: number = 0; // map với client.away

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToOne(() => Fixture, (fixture) => fixture.score, {
    onDelete: "CASCADE",
  })
  fixture!: Fixture;
}

export default FixtureScore;
