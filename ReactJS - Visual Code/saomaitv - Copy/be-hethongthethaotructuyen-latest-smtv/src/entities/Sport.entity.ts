import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import League from "./League.entity";
import Team from "./Team.entity";
import Fixture from "./Fixture.entity";
import Replay from "./Replay.entity";

@Entity({ name: "sports" }) // tên bảng trong MySQL
class Sport {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({
    name: "reference_id",
    type: "varchar",
    length: 255,
    unique: true,
    nullable: true,
  })
  referenceId?: string | null;

  @Column({ name: "slug", unique: true })
  slug!: string;

  @Column({ name: "priority", unique: false })
  priority!: number;

  @Column({ name: "name", unique: true })
  name!: string;

  @Column({
    name: "icon_url",
    type: "varchar",
    length: 500,
    unique: false,
    nullable: true,
  })
  iconUrl?: string | null;

  @Column({
    name: "background_card_url",
    type: "varchar",
    length: 500,
    unique: false,
    nullable: true,
  })
  backgroundCardUrl?: string;

  @Column({
    name: "background_main_url",
    type: "varchar",
    length: 500,
    unique: false,
    nullable: true,
  })
  backgroundMainUrl?: string;

  @Column({
    name: "poster_url",
    type: "varchar",
    length: 500,
    unique: false,
    nullable: true,
  })
  posterUrl?: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => League, (league) => league.sport)
  leagues!: League[];

  @OneToMany(() => Team, (team) => team.sport)
  teams!: Team[];

  @OneToMany(() => Fixture, (fixture) => fixture.sport)
  fixtures!: Fixture[];

  @OneToMany(() => Replay, (replay) => replay.sport)
  replays!: Replay[];
}

export default Sport;
