import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import InternalUser from "./InternalUser.entity";

@Entity({ name: "stream_sources" }) // tên bảng trong MySQL
class StreamSource {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @ManyToOne(() => InternalUser, (commentator) => commentator.streams, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "commentator_id" })
  commentator!: InternalUser;

  @Column({ name: "priority", unique: false, default: 0 })
  priority!: number;

  @Column({ name: "name", unique: false })
  name!: string;

  @Column({
    name: "source_url",
    type: "varchar",
    length: 500,
    unique: false,
    nullable: false,
  })
  sourceUrl!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}

export default StreamSource;
