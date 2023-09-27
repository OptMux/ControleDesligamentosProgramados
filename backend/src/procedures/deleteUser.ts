import { User } from "@prisma/client";
import { prisma } from "../db";

export async function deleteUser(userId: User["id"]) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}
