import { SystemEvent } from "@prisma/client";
import { prisma } from "../db";
import { createLog } from "./createLog";
import { LogSource } from "../enums/logs";

export async function stopEvent(event: SystemEvent) {
  const now = new Date();
  if (event.finishDate > now)
    throw new Error("this event cannot be finished yet");

  let newEvent: SystemEvent | undefined;
  try {
    newEvent = await prisma.systemEvent.update({
      data: {
        finishedAt: now,
      },
      where: {
        id: event.id,
        startedAt: {
          not: null,
        },
      },
    });
  } catch (err) {}
  await createLog(
    LogSource.ScheduledShutdown,
    newEvent
      ? `Evento [${event.title}] finalizado com sucesso`
      : `Erro ao finalizar o evento [${event.title}]`
  );
}
