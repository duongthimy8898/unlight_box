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

@Entity({ name: "replays" })
class Replay {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "slug", unique: true })
  slug!: string;

  @ManyToOne(() => Sport, (sport) => sport.leagues, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sport_id" })
  sport!: Sport;

  @Column({ name: "title" })
  title!: string;

  @Column({
    name: "thumbnail_url",
    type: "varchar",
    length: 500,
    nullable: true,
  })
  thumbnailUrl?: string | null;

  @Column({
    name: "video_source_url",
    type: "varchar",
    length: 500,
  })
  videoSourceUrl!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}

export default Replay;
