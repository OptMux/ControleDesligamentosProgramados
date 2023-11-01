import { prisma } from "../db";

export async function haveEventExceptions(): Promise<boolean> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59);

  const systemEventException = await prisma.systemEventException.findFirst({
    where: {
      date: {
        lte: todayEnd,
        gte: todayStart,
      },
    },
  });

  return !!systemEventException;
}
