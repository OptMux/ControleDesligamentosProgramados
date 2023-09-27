import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export type AuthRequest = Request & {
  userInfo: Omit<User, "password">;
};

export type AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
