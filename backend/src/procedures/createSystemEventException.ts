import { SystemEventException } from "@prisma/client";
import { prisma } from "../db";
import { validateFields } from "../utils/validateFields";

export async function createSystemEventException(
  description: string,
  date: Date
): Promise<SystemEventException> {
  validateFields({
    description,
  });

  if (new Date() > date)
    throw new Error(`SystemEventException date must be greater than now`);

  const SystemEventException = await prisma.systemEventException.create({
    data: {
      description,
      date,
    },
  });

  return SystemEventException;
}
