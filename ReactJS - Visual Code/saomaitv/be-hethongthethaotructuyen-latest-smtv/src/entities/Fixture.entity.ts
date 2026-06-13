import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Sport from "./Sport.entity";
import League from "./League.entity";
import Team from "./Team.entity";
import FixtureStatus from "./FixtureStatus.entity";
import FixtureScore from "./FixtureScore.entity";
import { FixtureCommentator } from "./FixtureCommentator.entity";

@Entity({ name: "fixtures" }) // tên bảng trong MySQL
class Fixture {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({
    name: "reference_id",
    type: "varchar",
    length: 255,
    unique: false,
    nullable: true,
  })
  referenceId?: string | null;

  @Column({
    name: "chat_channel_key_id",
    type: "varchar",
    length: 255,
    unique: true,
    nullable: true,
  })
  chatChannelKeyId?: string | null;

  @Column({ name: "slug", unique: true })
  slug!: string;

  @ManyToOne(() => Sport, (sport) => sport.fixtures, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sport_id" })
  sport!: Sport;

  @ManyToOne(() => League, (league) => league.fixtures, { onDelete: "CASCADE" })
  @JoinColumn({ name: "league_id" })
  league!: League;

  @ManyToOne(() => Team, (homeTeam) => homeTeam.homeFixtures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "home_team_id" })
  homeTeam!: Team;

  @ManyToOne(() => Team, (awayTeam) => awayTeam.awayFixtures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "away_team_id" })
  awayTeam!: Team;

  @Column({ name: "title", unique: false })
  title!: string;

  @Column({ name: "start_time", type: "timestamp", precision: 6 })
  startTime!: Date;

  @OneToMany(() => FixtureCommentator, (fc) => fc.fixture, {
    cascade: true,
  })
  fixtureCommentators!: FixtureCommentator[];

  @Column({ type: "int", name: "elapsed_time", nullable: true })
  elapsedTime?: number | null;

  @OneToOne(() => FixtureScore, (fixtureScore) => fixtureScore.fixture, {
    nullable: true,
    cascade: true, // khi save/remove Fixture thì cũng cascade sang FixtureScore
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "fixture_score_id" })
  score?: FixtureScore | null;

  @ManyToOne(() => FixtureStatus, (status) => status.fixtures, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "fixture_status_id" })
  status?: FixtureStatus | null;

  @Column({
    name: "is_live",
    default: false,
  })
  isLive!: boolean;

  @Column({
    name: "is_pinned",
    default: false,
  })
  isPinned!: boolean;

  @Column({
    name: "is_hot",
    default: false,
  })
  isHot!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}

export default Fixture;
