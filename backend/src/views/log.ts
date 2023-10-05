import { Router } from "express";
import { prisma } from "../db";
import { HttpStatus } from "../enums/requests";

export const logRouter = Router();

logRouter.get("/", async (req, res) => {
  const limit = parseInt((req.query.limit as any) || 100);
  const idPageCursor = (req.query.idPageCursor as any) || null;
  const rawPageCursor = (req.query.datePageCursor as any) || null;
  const pageCursor = rawPageCursor ? new Date(rawPageCursor) : null;

  const logs = await prisma.systemLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit + 1,
    ...(pageCursor && idPageCursor
      ? {
          cursor: {
            id: idPageCursor,
            createdAt: pageCursor,
          },
        }
      : null),
  });

  const lastLog = logs[limit];

  res.status(HttpStatus.OK).json({
    data: {
      logs: logs.slice(0, limit),
    },
    ...(lastLog
      ? {
          nextPage: new URLSearchParams({
            limit: limit as any as string,
            idPageCursor: lastLog.id,
            datePageCursor: lastLog.createdAt.toISOString(),
          }).toString(),
        }
      : null),
  });
});
