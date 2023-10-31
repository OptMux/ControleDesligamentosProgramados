import cors from "cors";
import express from "express";
import { generateFirstSuperUser } from "./generateFirstSuperUser";
import { settings } from "./settings";
import { apiRouter } from "./views";
import { startAllSchedulers } from "./schedulers";
import path from "path";

const app = express();

app.use(express.json());

if (settings.debugMode) app.use(cors());

app.use("/cdp", express.static(process.cwd() + "/cdp"));
app.get("/cdp/*", (_, response) => {
  response.sendFile(path.resolve(process.cwd(), "cdp", "index.html"));
});

app.use("/api", apiRouter);

generateFirstSuperUser().then(() => {
  startAllSchedulers();
  app.listen(settings.port);
});
