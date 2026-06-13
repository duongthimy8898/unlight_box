import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
import { DataSource } from "typeorm";
import InternalUser from "../entities/InternalUser.entity";
import ExternalUser from "../entities/ExternalUser.entity";
import Sport from "../entities/Sport.entity";
import League from "../entities/League.entity";
import Team from "../entities/Team.entity";
import Fixture from "../entities/Fixture.entity";
import FixtureScore from "../entities/FixtureScore.entity";
import FixtureStatus from "../entities/FixtureStatus.entity";
import { FixtureCommentator } from "../entities/FixtureCommentator.entity";
import StreamSource from "../entities/StreamSource.entity";
import Replay from "../entities/Replay.entity";
console.log("ENV check:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  DB_NAME: process.env.DB_NAME,
});
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT) ?? 3306,
  username: process.env.DB_USER ?? "root",
  password: process.env.DB_PWD ?? "root@123",
  database: process.env.DB_NAME ?? "hoiquantv",
  synchronize: process.env.NODE_ENV === "production" ? false : true, // 🚨 tự động sync schema, dev thì ok, production thì nên migration
  logging: false,
  entities: [
    InternalUser,
    StreamSource,
    ExternalUser,
    Sport,
    League,
    Team,
    FixtureScore,
    FixtureStatus,
    Fixture,
    FixtureCommentator,
    Replay,
  ],
  migrations: [],
  subscribers: [],
});
