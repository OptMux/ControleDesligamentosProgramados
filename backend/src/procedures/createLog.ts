import { SystemLog } from "@prisma/client";
import { prisma } from "../db";
import { validateFields } from "../utils/validateFields";
import { LogSource } from "../enums/logs";

export async function createLog(
  source: LogSource,
  message: string
): Promise<SystemLog> {
  validateFields({
    message,
  });

  const event = await prisma.systemLog.create({
    data: {
      source,
      message,
    },
  });

  return event;
}
