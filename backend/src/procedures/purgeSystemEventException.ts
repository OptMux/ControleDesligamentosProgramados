import { prisma } from "../db";

export async function purgeSystemEventException(dayLimit = 1) {
  const past = new Date();
  past.setDate(past.getDate() - dayLimit);

  const result = await prisma.systemEventException.deleteMany({
    where: {
      date: {
        lte: past,
      },
    },
  });

  return result.count > 0;
}
