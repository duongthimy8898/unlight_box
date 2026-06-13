import { Router } from "express";
import {
  getAllFixtures,
  getFixture,
  createFixture,
  updateFixture,
  deleteFixture,
  doneFixture,
  acts,
} from "../../controllers/internal/fixture.controller";

const internalFixtureRouter = Router();

internalFixtureRouter.get("/", getAllFixtures);
internalFixtureRouter.get("/get", getFixture);
internalFixtureRouter.post("/create", createFixture);
internalFixtureRouter.put("/acts", acts);
internalFixtureRouter.put("/update/:id", updateFixture);
internalFixtureRouter.put("/done/:id", doneFixture);
internalFixtureRouter.delete("/delete/:id", deleteFixture);

export default internalFixtureRouter;
