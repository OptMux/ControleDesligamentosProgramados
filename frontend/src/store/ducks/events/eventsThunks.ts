import { createAsyncThunk } from "@reduxjs/toolkit";
import { SystemEvent } from "./events.types";
import { deleteEvent, getEvents, updateEvent } from "../../../services/event";
import { RootState } from "../../store";

export interface DoGetEventsReturn {
  events: SystemEvent[];
  params?: string;
}

interface DoGetEventsPayload {
  ignoreState?: boolean;
  callback?: (err: Error | null, data: DoGetEventsReturn | null) => void;
}

export const doGetEvents = createAsyncThunk<
  DoGetEventsReturn,
  DoGetEventsPayload
>("event/getEvents", async ({ ignoreState, callback }, { getState }) => {
  const { events } = getState() as RootState;
  const params = ignoreState ? undefined : events?.pageParams;
  try {
    const data = await getEvents(undefined, undefined, params);
    callback?.(null, data);
    return data;
  } catch (err: any) {
    callback?.(err, null);
    throw err;
  }
});

interface DoUpdateEventPayload {
  id: SystemEvent["id"];
  eventData: Partial<Omit<SystemEvent, "id" | "startedAt" | "finishedAt">>;
  callback?: (err: Error | null, data: SystemEvent | null) => void;
}

export const doUpdateEvent = createAsyncThunk<
  SystemEvent,
  DoUpdateEventPayload
>("event/updateEvent", async ({ id, eventData, callback }) => {
  try {
    const data = await updateEvent(id, eventData);
    callback?.(null, data);
    return data;
  } catch (err: any) {
    callback?.(err, null);
    throw err;
  }
});

interface DoDeleteEventPayload {
  id: SystemEvent["id"];
  callback?: (err: Error | null) => void;
}

export const doDeleteEvent = createAsyncThunk<
  SystemEvent["id"],
  DoDeleteEventPayload
>("event/deleteEvent", async ({ id, callback }) => {
  try {
    await deleteEvent(id);
    callback?.(null);
    return id;
  } catch (err: any) {
    callback?.(err);
    throw err;
  }
});
