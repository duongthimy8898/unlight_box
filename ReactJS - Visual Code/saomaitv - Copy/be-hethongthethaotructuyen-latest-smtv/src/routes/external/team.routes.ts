import { Router } from "express";
import {
  getAllTeams,
  getTeam
} from "../../controllers/external/team.controller";

const externalTeamRouter = Router();

externalTeamRouter.get("/", getAllTeams);
externalTeamRouter.get("/get", getTeam);

export default externalTeamRouter;
