import cors from "cors";
import express from "express";
import { generateFirstSuperUser } from "./generateFirstSuperUser";
import { settings } from "./settings";
import { apiRouter } from "./views";

const app = express();

app.use(express.json());

if (settings.debugMode) app.use(cors());

app.use("/api", apiRouter);

generateFirstSuperUser().then(() => {
  app.listen(settings.port);
});
