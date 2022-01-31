import { userRouter } from "./user.router";
import { Express } from "express";
import { loginRouter } from "./login.router";

const routerInitializer = (app: Express) => {
  app.use("/users", userRouter());
  app.use("/login", loginRouter());
};

export default routerInitializer;
