import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import Sport from "./Sport.entity";
import Fixture from "./Fixture.entity";

@Entity({ name: "teams" })
@Unique(["sport", "name"]) // name + sport_id phải unique
class Team {
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

  @ManyToOne(() => Sport, (sport) => sport.teams, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sport_id" })
  sport!: Sport;

  @Column({ name: "name" }) // bỏ unique: true ở đây
  name!: string;

  @Column({
    name: "logo_url",
    type: "varchar",
    length: 500,
    nullable: true,
  })
  logoUrl?: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => Fixture, (fixture) => fixture.homeTeam)
  homeFixtures!: Fixture[];

  @OneToMany(() => Fixture, (fixture) => fixture.awayTeam)
  awayFixtures!: Fixture[];
}

export default Team;
