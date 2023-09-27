import express, { Router } from "express";
import { apiRouter } from "./views";
import { settings } from "./settings";
import { generateFirstSuperUser } from "./generateFirstSuperUser";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

generateFirstSuperUser().then(() => {
  app.listen(settings.port);
});
