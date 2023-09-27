import { User } from "@prisma/client";
import { prisma } from "../db";
import { settings } from "../settings";
import { encryptPassword } from "../utils/encrypt";
import jwt from "jsonwebtoken";

export async function userLogin(
  username: string,
  password: string
): Promise<{
  user: Omit<User, "password">;
  token: string;
}> {
  const passwordHash = await encryptPassword(password);

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      username: true,
      isAdmin: true,
    },
    where: {
      username: {
        equals: username,
      },
      password: {
        equals: passwordHash,
      },
    },
  });

  if (!user) throw new Error("username or password invalid");

  return await new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      settings.jwtSecret,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(new Error("authentication error"));
        resolve({
          user,
          token: token as any,
        });
      }
    );
  });
}
