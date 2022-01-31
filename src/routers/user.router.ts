import { Router } from "express";
import {
  editUser,
  getUser,
  listUsers,
  removeUser,
  signIn,
} from "../controllers/user.controller";
import { isAdmin } from "../middlewares/admin.middleware";
import { isAuthenticated } from "../middlewares/authentication.middleware";
import { isAuthorized } from "../middlewares/authorization.middleware";

const router = Router();

export const userRouter = () => {
  router.post("/", signIn);
  router.get("/", isAuthenticated, isAdmin, listUsers);
  router.get("/profile", isAuthenticated, getUser);
  router.patch("/:uuid", isAuthenticated, isAuthorized, editUser);
  router.delete("/:uuid", isAuthenticated, isAuthorized, removeUser);

  return router;
};
