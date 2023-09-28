import { SystemEvent } from "@prisma/client";
import { prisma } from "../db";

export async function deleteEvent(id: SystemEvent["id"]) {
  try {
    if (
      await prisma.systemEvent.findFirst({
        where: {
          id,
          startedAt: {
            not: {
              equals: null,
            },
          },
          finishedAt: {
            equals: null,
          },
        },
      })
    )
      return false;
    await prisma.systemEvent.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}
