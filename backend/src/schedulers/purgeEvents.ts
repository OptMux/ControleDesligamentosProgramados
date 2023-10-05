import { purgeEvents } from "../procedures/purgeEvents";
import { settings } from "../settings";
import { Debug } from "../utils/debug";
import { Scheduler } from "./Scheduler";

export const PurgeEventsScheduler = new Scheduler(async () => {
  Debug.log("Purging events...");
  await purgeEvents(settings.purgeLimitByMonths);
}, 30);
