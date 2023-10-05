import type { Scheduler } from "./Scheduler";
import { PurgeEventsScheduler } from "./purgeEvents";
import { PurgeLogsScheduler } from "./purgeLogs";
import { StartEventsScheduler } from "./startEvents";
import { StopEventsScheduler } from "./stopEvents";

const SCHEDULERS: Scheduler[] = [
  PurgeEventsScheduler,
  PurgeLogsScheduler,
  StartEventsScheduler,
  StopEventsScheduler,
];

export function startAllSchedulers() {
  SCHEDULERS.map(async (value) => value.start());
}
