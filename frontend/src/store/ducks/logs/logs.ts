import { createSlice } from "@reduxjs/toolkit";
import type { LogsSliceState } from "./logs.types";
import { doGetLogs } from "./logsThunks";

const initialState: LogsSliceState = {
  logs: [],
  pageParams: undefined,
  isLoading: false,
};

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetLogs.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(doGetLogs.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.pageParams && !action.meta.arg.ignoreState)
        state.logs.push(...(action.payload?.logs ?? []));
      else state.logs = action.payload?.logs ?? [];
      state.pageParams = action.payload.params;
    });

    builder.addCase(doGetLogs.rejected, (state) => {
      state.isLoading = false;
      state.logs = [];
      state.pageParams = undefined;
    });
  },
});
