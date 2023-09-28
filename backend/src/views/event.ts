import { Router } from "express";
import { prisma } from "../db";
import { HttpStatus } from "../enums/requests";
import { parseBoolean } from "../utils/parseBoolean";
import { onlyAdmin } from "../middlewares/onlyAdmin";
import { SystemEvent } from "@prisma/client";
import { createEvent } from "../procedures/createEvent";
import { updateEvent } from "../procedures/updateEvent";
import { deleteEvent } from "../procedures/deleteEvent";

export const eventRouter = Router();

eventRouter.get("/", async (req, res) => {
  const { onlyActive = "false" } = req.query;
  const limit = parseInt((req.query.limit as any) || 100);
  const idPageCursor = (req.query.idPageCursor as any) || null;
  const rawPageCursor = (req.query.datePageCursor as any) || null;
  const pageCursor = rawPageCursor ? new Date(rawPageCursor) : null;
  const search = (req.query.search as string) || null;

  const filterByActive = parseBoolean(onlyActive as any);

  let where: any = {};
  if (search)
    where = {
      ...where,
      title: {
        contains: search,
      },
    };

  if (filterByActive)
    where = {
      ...where,
      finishedAt: {
        equals: null,
      },
    };

  const events = await prisma.systemEvent.findMany({
    orderBy: {
      startDate: "desc",
    },
    take: limit + 1,
    ...(pageCursor && idPageCursor
      ? {
          cursor: {
            id: idPageCursor,
            startDate: pageCursor,
          },
        }
      : null),
    where,
  });

  const lastEvent = events[limit];

  res.status(HttpStatus.OK).json({
    data: {
      events: events.slice(0, limit),
    },
    ...(lastEvent
      ? {
          nextPage: new URLSearchParams({
            limit: limit as any as string,
            onlyActive: onlyActive as string,
            idPageCursor: lastEvent.id,
            datePageCursor: lastEvent.startDate.toISOString(),
          }).toString(),
        }
      : null),
  });
});

eventRouter.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;

  const event = await prisma.systemEvent.findFirst({
    where: {
      id: eventId,
    },
  });

  if (!event)
    return res.status(HttpStatus.NOT_FOUND).json({
      message: "event for this id not found",
    });

  res.status(HttpStatus.OK).send({
    data: {
      event,
    },
  });
});

eventRouter.post("/", onlyAdmin, async (req, res) => {
  const {
    title,
    description,
    startDate,
    finishDate,
  }: {
    title: SystemEvent["title"];
    description: SystemEvent["description"];
    startDate: SystemEvent["startDate"];
    finishDate: SystemEvent["finishDate"];
  } = req.body;

  try {
    const event = await createEvent(
      title,
      description,
      new Date(startDate),
      new Date(finishDate)
    );
    res.status(HttpStatus.CREATED).json({
      message: "event created successfully",
      data: {
        event,
      },
    });
  } catch (err: any) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: err?.message,
    });
  }
});

eventRouter.put("/:eventId", onlyAdmin, async (req, res) => {
  const { eventId } = req.params;
  const {
    title,
    description,
    startDate,
    finishDate,
  }: {
    title: SystemEvent["title"];
    description: SystemEvent["description"];
    startDate: SystemEvent["startDate"];
    finishDate: SystemEvent["finishDate"];
  } = req.body;

  try {
    const event = await updateEvent(eventId, {
      title,
      description,
      startDate: startDate ? new Date(startDate) : undefined,
      finishDate: finishDate ? new Date(finishDate) : undefined,
    });

    res.status(HttpStatus.OK).json({
      message: "event updated successfully",
      data: {
        event,
      },
    });
  } catch (err: any) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: err?.message,
    });
  }
});

eventRouter.delete("/:eventId", onlyAdmin, async (req, res) => {
  const { eventId } = req.params;

  if (await deleteEvent(eventId))
    return res.status(HttpStatus.OK).json({
      message: "event deleted successfully",
    });
  res.status(HttpStatus.NOT_FOUND).json({
    message: "event not found",
  });
});
