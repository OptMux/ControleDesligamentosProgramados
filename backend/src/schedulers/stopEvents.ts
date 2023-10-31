import { prisma } from "../db";
import { stopAllPins } from "../procedures/io";
import { stopEvent } from "../procedures/stopEvent";
import { canStartEvents } from "../utils/canStartEvents";
import { checkHourRange } from "../utils/checkHourRange";
import { Debug } from "../utils/debug";
import { Scheduler } from "./Scheduler";

export const StopEventsScheduler = new Scheduler(async () => {
  const now = new Date();
  const events = await prisma.systemEvent.findMany({
    where: {
      finishDate: {
        lte: now,
      },
      startedAt: {
        not: null,
      },
      finishedAt: null,
    },
  });

  if ([0, 6].includes(now.getDay()) && checkHourRange(10, 14) === 1) {
    const canStop = await canStartEvents();
    if (canStop) stopAllPins();
  }

  if (events.length > 0)
    Debug.log("Found events to finish. Trying to finish them...");

  for (const event of events) {
    try {
      await stopEvent(event);
      stopAllPins();
    } catch (err) {
      console.error(err);
    }
  }
});
