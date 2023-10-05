import { SystemEvent } from "@prisma/client";
import { prisma } from "../db";
import { createLog } from "./createLog";
import { LogSource } from "../enums/logs";

export async function startEvent(event: SystemEvent) {
  const now = new Date();
  if (event.startDate > now)
    throw new Error("this event cannot be started yet");

  let newEvent: SystemEvent | undefined;
  try {
    newEvent = await prisma.systemEvent.update({
      data: {
        startedAt: now,
      },
      where: {
        id: event.id,
        startedAt: null,
      },
    });
  } catch (err) {}
  await createLog(
    LogSource.ScheduledShutdown,
    newEvent
      ? `Evento [${event.title}] iniciado com sucesso`
      : `Erro ao iniciar o evento [${event.title}]`
  );
}
