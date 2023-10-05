import { prisma } from "../db";

export async function purgeEvents(monthLimit = 1) {
  const past = new Date();
  past.setDate(past.getDate() - monthLimit * 30);

  const result = await prisma.systemEvent.deleteMany({
    where: {
      finishDate: {
        lte: past,
      },
    },
  });

  return result.count > 0;
}
