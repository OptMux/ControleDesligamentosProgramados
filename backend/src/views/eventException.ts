import { Router } from "express";
import { HttpStatus } from "../enums/requests";
import { prisma } from "../db";
import { onlyAdmin } from "../middlewares/onlyAdmin";
import { SystemEventException } from "@prisma/client";
import { createSystemEventException } from "../procedures/createSystemEventException";
import { deleteSystemEventException } from "../procedures/deleteSystemEventException";

export const eventExceptionRouter = Router();

eventExceptionRouter.get("/", async (req, res) => {
  const limit = parseInt((req.query.limit as any) || 100);
  const idPageCursor = (req.query.idPageCursor as any) || null;
  const rawPageCursor = (req.query.datePageCursor as any) || null;
  const pageCursor = rawPageCursor ? new Date(rawPageCursor) : null;
  const order = (req.query.order || "desc") as "asc" | "desc";
  const search = (req.query.search as string) || null;

  let where: any;
  if (search)
    where = {
      description: {
        contains: search,
      },
    };

  const eventExceptions = await prisma.systemEventException.findMany({
    orderBy: {
      date: order,
    },
    take: limit + 1,
    ...(pageCursor && idPageCursor
      ? {
          cursor: {
            id: idPageCursor,
            date: pageCursor,
          },
        }
      : null),
    where,
  });

  const lastEventException = eventExceptions[limit];

  res.status(HttpStatus.OK).json({
    data: {
      eventExceptions: eventExceptions.slice(0, limit),
    },
    ...(lastEventException
      ? {
          nextPage: new URLSearchParams({
            limit: limit as any as string,
            idPageCursor: lastEventException.id,
            datePageCursor: lastEventException.date.toISOString(),
            order,
            ...(search ? { search: search as string } : {}),
          }).toString(),
        }
      : null),
  });
});

eventExceptionRouter.post("/", onlyAdmin, async (req, res) => {
  const {
    description,
    date,
  }: {
    description: SystemEventException["description"];
    date: SystemEventException["date"];
  } = req.body;

  try {
    const eventException = await createSystemEventException(
      description,
      new Date(date)
    );
    res.status(HttpStatus.CREATED).json({
      message: "event exception created successfully",
      data: {
        eventException,
      },
    });
  } catch (err: any) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: err?.message,
    });
  }
});

eventExceptionRouter.delete("/:exceptionId", onlyAdmin, async (req, res) => {
  const { exceptionId } = req.params;

  const result = await deleteSystemEventException(exceptionId);

  if (result)
    return res.status(HttpStatus.OK).json({
      message: "system exception deleted successfully",
    });
  res.status(HttpStatus.NOT_FOUND).json({
    message: "event exception not found",
  });
});
