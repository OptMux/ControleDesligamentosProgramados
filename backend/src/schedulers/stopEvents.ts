import { prisma } from "../db";
import { stopEvent } from "../procedures/stopEvent";
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

  if (events.length > 0)
    Debug.log("Found events to finish. Trying to finish them...");

  for (const event of events) {
    try {
      await stopEvent(event);
    } catch (err) {
      console.error(err);
    }
  }
});
