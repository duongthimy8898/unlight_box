import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Fixture from "./Fixture.entity";

@Entity({ name: "fixture_statuses" })
class FixtureStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "reference_id",
    type: "varchar",
    length: 255,
    unique: true,
    nullable: true,
  })
  referenceId?: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  code?: string | null; // map với client.code

  @Column({ type: "varchar", length: 255 })
  description!: string; // map với client.description

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => Fixture, (fixture) => fixture.status)
  fixtures!: Fixture[];
}

export default FixtureStatus;
