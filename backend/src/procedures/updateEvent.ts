import { SystemEvent } from "@prisma/client";
import { prisma } from "../db";
import { filterData } from "../utils/filterData";
import { validateFields } from "../utils/validateFields";

export async function updateEvent(
  id: SystemEvent["id"],
  data: Partial<Omit<SystemEvent, "startedAt" | "finishedAt">>
): Promise<SystemEvent> {
  validateFields(
    {
      startedAt: (data as any)?.startedAt,
      finishedAt: (data as any)?.finishedAt,
    },
    "should not be updated manually",
    (_, value) => !Boolean(value)
  );

  const eventToUpdate = await prisma.systemEvent.findFirst({
    where: {
      id,
    },
  });

  if (!eventToUpdate) throw new Error("invalid event id");

  if (eventToUpdate.startedAt || eventToUpdate.finishedAt)
    throw new Error("this event already started and cannot be updated");

  if (
    (data.startDate || data.finishDate) &&
    (data.startDate ?? eventToUpdate.startDate) >=
      (data.finishDate ?? eventToUpdate.finishDate)
  )
    throw new Error("finishDate must be greater than startDate");

  if ((data.startDate?.getTime?.() ?? 0) <= Date.now())
    throw new Error("startDate must be greater than current date");

  const filteredData = filterData(data, [
    "title",
    "description",
    "startDate",
    "finishDate",
  ]);

  const event = await prisma.systemEvent.update({
    where: {
      id,
    },
    data: filteredData,
  });

  return event;
}
