import { SystemEvent } from "@prisma/client";
import { prisma } from "../db";
import { validateFields } from "../utils/validateFields";

export async function createEvent(
  title: SystemEvent["title"],
  description: SystemEvent["description"],
  startDate: SystemEvent["startDate"],
  finishDate: SystemEvent["finishDate"]
): Promise<SystemEvent> {
  validateFields({
    title,
    description,
  });

  if (startDate >= finishDate)
    throw new Error("finishDate must be greater than startDate");

  if (startDate.getTime() <= Date.now())
    throw new Error("startDate must be greater than current date");

  let existingEvent = await prisma.systemEvent.findFirst({
    where: {
      startDate: {
        lte: startDate,
      },
      finishDate: {
        gte: startDate,
      },
    },
  });
  if (!existingEvent)
    existingEvent = await prisma.systemEvent.findFirst({
      where: {
        startDate: {
          lte: finishDate,
        },
        finishDate: {
          gte: finishDate,
        },
      },
    });

  if (existingEvent)
    throw new Error("an event in this datetime already exists");

  const event = await prisma.systemEvent.create({
    data: {
      title,
      description,
      startDate,
      finishDate,
    },
  });

  return event;
}
