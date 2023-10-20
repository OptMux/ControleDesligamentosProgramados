import { purgeSystemEventException } from "../procedures/purgeSystemEventException";
import { Debug } from "../utils/debug";
import { Scheduler } from "./Scheduler";

export const PurgeSystemEventExceptionsScheduler = new Scheduler(async () => {
  Debug.log("Purging eventExceptionsScheculers...");
  await purgeSystemEventException();
}, 30);
