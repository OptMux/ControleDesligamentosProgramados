import { User } from "@prisma/client";
import { encryptPassword } from "../utils/encrypt";
import { prisma } from "../db";

export async function changePassword(
  userId: User["id"],
  oldPassword: string,
  newPassword: string
) {
  const oldPasswordHash = await encryptPassword(oldPassword);

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      username: true,
      isAdmin: true,
    },
    where: {
      id: userId,
      password: oldPasswordHash,
    },
  });

  if (!user) return false;

  const newPasswordHash = await encryptPassword(newPassword);

  await prisma.user.update({
    data: {
      password: newPasswordHash,
    },
    where: {
      id: userId,
    },
  });

  return true;
}
