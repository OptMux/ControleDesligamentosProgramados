import { prisma } from "../db";
import { startAllPins } from "../procedures/io";
import { startEvent } from "../procedures/startEvent";
import { canStartEvents } from "../utils/canStartEvents";
import { checkHourRange } from "../utils/checkHourRange";
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

  if ([0, 6].includes(now.getDay()) && checkHourRange(10, 14) === 0) {
    const canStart = await canStartEvents();
    if (canStart) startAllPins();
  }

  if (events.length > 0)
    Debug.log("Found events to start. Trying to start them...");

  for (const event of events) {
    try {
      await startEvent(event);
      startAllPins();
    } catch (err) {
      console.error(err);
    }
  }
});
