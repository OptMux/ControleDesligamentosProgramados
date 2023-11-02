import { prisma } from "../db";
import { startGpio } from "../procedures/io";
import { startEvent } from "../procedures/startEvent";
import { checkHourRange } from "../utils/checkHourRange";
import { Debug } from "../utils/debug";
import { haveEventExceptions } from "../utils/haveEventExceptions";
import { Scheduler } from "./Scheduler";

export const StartEventsScheduler = new Scheduler(async () => {
  const now = new Date();
  const events = await prisma.systemEvent.findMany({
    where: {
      startDate: {
        lte: now,
      },
      finishDate: {
        gt: now,
      },
      startedAt: null,
    },
  });

  if ([0, 6].includes(now.getDay()) && checkHourRange(10, 14) === 0) {
    const canStart = !(await haveEventExceptions());
    if (canStart) startGpio();
  }

  if (events.length > 0)
    Debug.log("Found events to start. Trying to start them...");

  for (const event of events) {
    try {
      await startGpio();
      await startEvent(event);
    } catch (err) {
      console.error(err);
    }
  }
});
