import InternalUser from "../entities/InternalUser.entity";
import ExternalUser from "../entities/ExternalUser.entity";
import { AppDataSource } from "./data-source";
import Sport from "../entities/Sport.entity";
import League from "../entities/League.entity";
import Team from "../entities/Team.entity";
import Fixture from "../entities/Fixture.entity";
import FixtureScore from "../entities/FixtureScore.entity";
import FixtureStatus from "../entities/FixtureStatus.entity";
import { FixtureCommentator } from "../entities/FixtureCommentator.entity";
import StreamSource from "../entities/StreamSource.entity";
import Replay from "../entities/Replay.entity";

const internalUserRepo = AppDataSource.getRepository(InternalUser);
const streamSourceRepo = AppDataSource.getRepository(StreamSource);
const externalUserRepo = AppDataSource.getRepository(ExternalUser);
const sportRepo = AppDataSource.getRepository(Sport);
const leagueRepo = AppDataSource.getRepository(League);
const teamRepo = AppDataSource.getRepository(Team);
const fixtureRepo = AppDataSource.getRepository(Fixture);
const fixtureScoreRepo = AppDataSource.getRepository(FixtureScore);
const fixtureStatusRepo = AppDataSource.getRepository(FixtureStatus);
const fixtureCommentatorRepo = AppDataSource.getRepository(FixtureCommentator);
const replayRepo = AppDataSource.getRepository(Replay);

export {
  internalUserRepo,
  streamSourceRepo,
  externalUserRepo,
  sportRepo,
  leagueRepo,
  teamRepo,
  fixtureRepo,
  fixtureScoreRepo,
  fixtureStatusRepo,
  fixtureCommentatorRepo,
  replayRepo
};
