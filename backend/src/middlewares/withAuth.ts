import type { NextFunction, Response } from "express";
import { getBearerToken } from "../utils/bearer";
import jwt from "jsonwebtoken";
import { settings } from "../settings";
import { User } from "@prisma/client";
import { HttpStatus } from "../enums/requests";
import type { AuthMiddleware, AuthRequest } from "./auth.types";

function withAuthMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) throw new Error("missing authorization");
    const token = getBearerToken(authorizationHeader ?? "");
    jwt.verify(token, settings.jwtSecret, (err, tokenData) => {
      if (err) {
        res.status(HttpStatus.UNAUTHORIZED).end();
        return;
      }
      const user: Omit<User, "password"> = tokenData as any;

      req.userInfo = user;

      next();
    });
  } catch (err: any) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: err?.message,
    });
  }
}

export const withAuth: AuthMiddleware = withAuthMiddleware as any;
