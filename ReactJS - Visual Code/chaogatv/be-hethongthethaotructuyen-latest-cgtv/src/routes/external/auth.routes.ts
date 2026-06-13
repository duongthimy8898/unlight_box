import {
  externalAuthLogin,
  externalAuthRegister,
} from "../../controllers/external/auth.controller";
import { Router } from "express";

const externalAuthRouter = Router();

externalAuthRouter.post("/login", externalAuthLogin);
externalAuthRouter.post("/register", externalAuthRegister);
export default externalAuthRouter;
