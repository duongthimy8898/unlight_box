import { Router } from "express";
import {
  getAllLeagues,
  getLeague,
} from "../../controllers/external/league.controller";

const externalLeagueRouter = Router();

externalLeagueRouter.get("/", getAllLeagues);
externalLeagueRouter.get("/get", getLeague);

export default externalLeagueRouter;
