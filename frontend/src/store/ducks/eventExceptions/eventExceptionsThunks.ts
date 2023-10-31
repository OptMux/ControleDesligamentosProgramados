import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { EventException } from "./eventExceptions.types";
import {
  createEventException,
  deleteEventException,
  getEventExceptions,
} from "../../../services/eventExceptions";

export interface DoGetEventExceptionReturn {
  eventExceptions: EventException[];
  params?: string;
}

interface DoGetEventExceptionPayload {
  search?: string;
  ignoreState?: boolean;
  callback?: (
    err: Error | null,
    data: DoGetEventExceptionReturn | null
  ) => void;
}

export const doGetEventExceptions = createAsyncThunk<
  DoGetEventExceptionReturn,
  DoGetEventExceptionPayload
>(
  "eventException/getEventExceptions",
  async ({ search, ignoreState, callback }, { getState }) => {
    const { eventExceptions } = getState() as RootState;
    const params = ignoreState ? undefined : eventExceptions?.pageParams;
    try {
      const data = await getEventExceptions(undefined, search, params);
      callback?.(null, data);
      return data;
    } catch (err: any) {
      callback?.(err, null);
      throw err;
    }
  }
);

interface DoDeleteEventExceptionPayload {
  id: EventException["id"];
  callback?: (err: Error | null) => void;
}

export const doDeleteEventException = createAsyncThunk<
  EventException["id"],
  DoDeleteEventExceptionPayload
>("eventException/deleteEventException", async ({ id, callback }) => {
  try {
    await deleteEventException(id);
    callback?.(null);
    return id;
  } catch (err: any) {
    callback?.(err);
    throw err;
  }
});

interface DoCreateEventExceptionPayload {
  eventExceptionData: Pick<EventException, "description" | "date">;
  callback?: (err: Error | null, data: EventException | null) => void;
}

export const doCreateEventException = createAsyncThunk<
  EventException,
  DoCreateEventExceptionPayload
>(
  "eventException/createEventException",
  async ({ eventExceptionData, callback }) => {
    try {
      const data = await createEventException(eventExceptionData);
      callback?.(null, data);
      return data;
    } catch (err: any) {
      callback?.(err, null);
      throw err;
    }
  }
);
