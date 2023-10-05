import { prisma } from "../db";
import { startEvent } from "../procedures/startEvent";
import { Debug } from "../utils/debug";
import { Scheduler } from "./Scheduler";

export const StartEventsScheduler = new Scheduler(async () => {
  const now = new Date();
  const events = await prisma.systemEvent.findMany({
    where: {
      startDate: {
        lte: now,
      },
      startedAt: null,
    },
  });
  if (events.length > 0)
    Debug.log("Found events to start. Trying to start them...");

  for (const event of events) {
    try {
      await startEvent(event);
    } catch (err) {
      console.error(err);
    }
  }
});
