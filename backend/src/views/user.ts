import { Router } from "express";
import { HttpStatus } from "../enums/requests";
import { AuthRequest } from "../middlewares/auth.types";
import { onlyAdmin } from "../middlewares/onlyAdmin";
import { withAuth } from "../middlewares/withAuth";
import { createUser } from "../procedures/createUser";
import { deleteUser } from "../procedures/deleteUser";
import { prisma } from "../db";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const { id } = (req as AuthRequest)?.userInfo ?? {};
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      username: true,
      isAdmin: true,
    },
    where: {
      id,
    },
  });

  if (!user) return res.status(HttpStatus.UNAUTHORIZED).end();

  res.status(HttpStatus.OK).json({
    data: {
      user,
    },
  });
});

userRouter.post("/", onlyAdmin, async (req, res) => {
  const {
    username = "",
    password = "",
    isAdmin = false,
  }: { username: string; password: string; isAdmin: boolean } = req.body ?? {};

  if (username?.length === 0 || password?.length === 0)
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "username or password must not be empty",
    });

  const user = await createUser(username, password, isAdmin);

  res.status(HttpStatus.CREATED).json({
    message: "user created successfully",
    data: { user },
  });
});

userRouter.delete("/:userId", onlyAdmin, async (req, res) => {
  const { userId } = req.params;
  const { id } = (req as AuthRequest)?.userInfo ?? {};

  if (userId === id)
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "you can't delete yourself",
    });

  const result = await deleteUser(userId);

  if (result)
    return res.status(HttpStatus.OK).json({
      message: "user deleted successfully",
    });
  res.status(HttpStatus.NOT_FOUND).json({
    message: "event not found or already started/finished",
  });
});
