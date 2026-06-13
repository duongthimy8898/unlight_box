import { Router } from "express";
import {
  getAllLeagues,
  getLeague,
  createLeague,
  updateLeague,
  deleteLeague,
} from "../../controllers/internal/league.controller";

const internalLeagueRouter = Router();

internalLeagueRouter.get("/", getAllLeagues);
internalLeagueRouter.get("/get", getLeague);
internalLeagueRouter.post("/create", createLeague);
internalLeagueRouter.put("/update/:id", updateLeague);
internalLeagueRouter.delete("/delete/:id", deleteLeague);

export default internalLeagueRouter;
