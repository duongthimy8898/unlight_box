import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import Sport from "./Sport.entity";
import Fixture from "./Fixture.entity";

@Entity({ name: "leagues" })
@Unique(["sport", "name"])        // name + sport_id phải unique
@Unique(["sport", "shortName"])   // shortName + sport_id phải unique
class League {
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

  @ManyToOne(() => Sport, (sport) => sport.leagues, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sport_id" })
  sport!: Sport;

  @Column({
    name: "short_name",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  shortName?: string | null;

  @Column({ name: "name" })
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

  @OneToMany(() => Fixture, (fixture) => fixture.league)
  fixtures!: Fixture[];
}

export default League;
