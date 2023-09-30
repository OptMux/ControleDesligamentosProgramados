import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { EventsSliceState, SystemEvent } from "./events.types";
import { idFactory } from "../../../utils/generators";
import {
  doCreateEvent,
  doDeleteEvent,
  doGetEvents,
  doUpdateEvent,
} from "./eventsThunks";

const ids = idFactory();

const initialState: EventsSliceState = {
  events: [],
  isLoading: false,
  isLoadingPages: false,
  pageParams: undefined,
  eventsInLoading: {},
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<SystemEvent, "id">>) => {
      state.events.push({ id: `${ids.nextId()}`, ...action.payload });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doGetEvents.pending, (state) => {
      const loadPages = Boolean(state.pageParams);
      state.isLoading = !loadPages;
      state.isLoadingPages = loadPages;
    });

    builder.addCase(doGetEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoadingPages = false;
      if (state.pageParams && !action.meta.arg.ignoreState)
        state.events.push(...(action.payload.events ?? []));
      else state.events = action.payload.events ?? [];
      state.pageParams = action.payload.params;
    });

    builder.addCase(doGetEvents.rejected, (state) => {
      state.isLoading = false;
      state.isLoadingPages = false;
      state.events = [];
      state.pageParams = undefined;
    });

    builder.addCase(doCreateEvent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(doCreateEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events.push(action.payload);
    });

    builder.addCase(doCreateEvent.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(doUpdateEvent.pending, (state, action) => {
      state.eventsInLoading[action.meta.arg.id] = true;
    });

    builder.addCase(doUpdateEvent.fulfilled, (state, action) => {
      delete state.eventsInLoading[action.meta.arg.id];
      state.events = state.events.map((event) =>
        event?.id === action.payload.id
          ? {
              ...event,
              ...action.payload,
            }
          : event
      );
    });

    builder.addCase(doUpdateEvent.rejected, (state, action) => {
      delete state.eventsInLoading[action.meta.arg.id];
    });

    builder.addCase(doDeleteEvent.pending, (state, action) => {
      state.eventsInLoading[action.meta.arg.id] = true;
    });

    builder.addCase(doDeleteEvent.fulfilled, (state, action) => {
      delete state.eventsInLoading[action.meta.arg.id];
      state.events = state.events.filter(
        (event) => event?.id !== action.payload
      );
    });

    builder.addCase(doDeleteEvent.rejected, (state, action) => {
      delete state.eventsInLoading[action.meta.arg.id];
    });
  },
});
