import express, { Express } from "express";
import "reflect-metadata";
import connection from "./database";
import routerInitializer from "./routers";

connection();

const app: Express = express();

app.use(express.json());
routerInitializer(app);

export default app;
