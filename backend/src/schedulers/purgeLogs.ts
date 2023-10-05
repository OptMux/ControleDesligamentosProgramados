import { purgeLogs } from "../procedures/purgeLogs";
import { settings } from "../settings";
import { Debug } from "../utils/debug";
import { Scheduler } from "./Scheduler";

export const PurgeLogsScheduler = new Scheduler(async () => {
  Debug.log("Purging logs...");
  await purgeLogs(settings.purgeLimitByMonths);
}, 30);
