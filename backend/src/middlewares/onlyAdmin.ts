import type { NextFunction, Response } from "express";
import { prisma } from "../db";
import type { AuthMiddleware, AuthRequest } from "./auth.types";
import { HttpStatus } from "../enums/requests";

async function onlyAdminMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const user = await prisma.user.findFirst({
    where: {
      id: req.userInfo?.id,
      isAdmin: true,
    },
  });

  if (!user) {
    res.status(HttpStatus.FORBIDDEN).end();
    return;
  }
  next();
}

export const onlyAdmin: AuthMiddleware = onlyAdminMiddleware as any;
