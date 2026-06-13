import { Router } from "express";
import { getAllInternalUsersBy } from '../../controllers/internal/internalUser.controller';
import {
  getAllInternalUsers,
  getInternalUser,
  createInternalUser,
  updateInternalUser,
  deleteInternalUser,
} from "../../controllers/internal/internalUser.controller";

const internalUserRouter = Router();

internalUserRouter.get("/", getAllInternalUsers);
internalUserRouter.get("/by", getAllInternalUsersBy);
internalUserRouter.get("/get", getInternalUser);
internalUserRouter.post("/create", createInternalUser);
internalUserRouter.put("/update/:id", updateInternalUser);
internalUserRouter.delete("/delete/:id", deleteInternalUser);

export default internalUserRouter;
