import { createSlice } from "@reduxjs/toolkit";
import { EventExceptionsSliceState } from "./eventExceptions.types";
import {
  doCreateEventException,
  doDeleteEventException,
  doGetEventExceptions,
} from "./eventExceptionsThunks";

const initialState: EventExceptionsSliceState = {
  eventExceptions: [],
  isLoading: false,
  isLoadingPages: false,
  eventExceptionsInLoading: {},
};

export const eventExceptionsSlice = createSlice({
  name: "eventExceptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetEventExceptions.pending, (state) => {
      const loadPages = Boolean(state.pageParams);
      state.isLoading = !loadPages;
      state.isLoadingPages = loadPages;
    });

    builder.addCase(doGetEventExceptions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoadingPages = false;
      if (state.pageParams && !action.meta.arg.ignoreState)
        state.eventExceptions.push(...(action.payload.eventExceptions ?? []));
      else state.eventExceptions = action.payload.eventExceptions ?? [];
      state.pageParams = action.payload.params;
    });

    builder.addCase(doGetEventExceptions.rejected, (state) => {
      state.isLoading = false;
      state.isLoadingPages = false;
      state.eventExceptions = [];
      state.pageParams = undefined;
    });

    builder.addCase(doCreateEventException.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(doCreateEventException.fulfilled, (state, action) => {
      state.isLoading = false;
      state.eventExceptions.push(action.payload);
    });

    builder.addCase(doCreateEventException.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(doDeleteEventException.pending, (state, action) => {
      state.eventExceptionsInLoading[action.meta.arg.id] = true;
    });

    builder.addCase(doDeleteEventException.fulfilled, (state, action) => {
      delete state.eventExceptionsInLoading[action.meta.arg.id];
      state.eventExceptions = state.eventExceptions.filter(
        (eventException) => eventException?.id !== action.payload
      );
    });

    builder.addCase(doDeleteEventException.rejected, (state, action) => {
      delete state.eventExceptionsInLoading[action.meta.arg.id];
    });
  },
});
