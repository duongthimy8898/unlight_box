"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
const typeorm_1 = require("typeorm");
const InternalUser_entity_1 = __importDefault(require("../entities/InternalUser.entity"));
const ExternalUser_entity_1 = __importDefault(require("../entities/ExternalUser.entity"));
const Sport_entity_1 = __importDefault(require("../entities/Sport.entity"));
const League_entity_1 = __importDefault(require("../entities/League.entity"));
const Team_entity_1 = __importDefault(require("../entities/Team.entity"));
const Fixture_entity_1 = __importDefault(require("../entities/Fixture.entity"));
const FixtureScore_entity_1 = __importDefault(require("../entities/FixtureScore.entity"));
const FixtureStatus_entity_1 = __importDefault(require("../entities/FixtureStatus.entity"));
const FixtureCommentator_entity_1 = require("../entities/FixtureCommentator.entity");
const StreamSource_entity_1 = __importDefault(require("../entities/StreamSource.entity"));
const Replay_entity_1 = __importDefault(require("../entities/Replay.entity"));
console.log("ENV check:", {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PWD: process.env.DB_PWD,
    DB_NAME: process.env.DB_NAME,
});
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) ?? 3306,
    username: process.env.DB_USER ?? "root",
    password: process.env.DB_PWD ?? "root@123",
    database: process.env.DB_NAME ?? "hoiquantv",
    synchronize: process.env.NODE_ENV === "production" ? false : true, // 🚨 tự động sync schema, dev thì ok, production thì nên migration
    logging: false,
    entities: [
        InternalUser_entity_1.default,
        StreamSource_entity_1.default,
        ExternalUser_entity_1.default,
        Sport_entity_1.default,
        League_entity_1.default,
        Team_entity_1.default,
        FixtureScore_entity_1.default,
        FixtureStatus_entity_1.default,
        Fixture_entity_1.default,
        FixtureCommentator_entity_1.FixtureCommentator,
        Replay_entity_1.default,
    ],
    migrations: [],
    subscribers: [],
});
