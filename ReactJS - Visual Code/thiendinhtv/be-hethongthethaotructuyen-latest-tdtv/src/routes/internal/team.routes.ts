import { Router } from "express";
import {
  getAllTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../../controllers/internal/team.controller";

const internalTeamRouter = Router();

internalTeamRouter.get("/", getAllTeams);
internalTeamRouter.get("/get", getTeam);
internalTeamRouter.post("/create", createTeam);
internalTeamRouter.put("/update/:id", updateTeam);
internalTeamRouter.delete("/delete/:id", deleteTeam);

export default internalTeamRouter;
