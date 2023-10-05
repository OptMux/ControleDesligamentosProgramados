import { prisma } from "../db";

export async function purgeLogs(monthLimit = 1) {
  const past = new Date();
  past.setDate(past.getDate() - monthLimit * 30);

  const result = await prisma.systemLog.deleteMany({
    where: {
      createdAt: {
        lte: past,
      },
    },
  });

  return result.count > 0;
}
