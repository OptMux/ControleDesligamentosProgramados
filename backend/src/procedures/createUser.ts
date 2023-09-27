import { User } from "@prisma/client";
import { prisma } from "../db";
import { encryptPassword } from "../utils/encrypt";

export async function createUser(
  username: string,
  password: string,
  isAdmin: boolean = false
): Promise<Omit<User, "password">> {
  const passwordHash = await encryptPassword(password);

  const { password: _, ...data } = await prisma.user.create({
    data: {
      username,
      password: passwordHash,
      isAdmin: isAdmin,
    },
  });

  return data;
}
