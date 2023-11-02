import { createAsyncThunk } from "@reduxjs/toolkit";
import { SystemLog } from "./logs.types";
import { RootState } from "../../store";
import { getLogs } from "../../../services/log";

export interface DoGetLogsReturn {
  logs: SystemLog[];
  params?: string;
}

interface DoGetLogsPayload {
  ignoreState?: boolean;
  callback?: (err: Error | null, data: DoGetLogsReturn | null) => void;
}

export const doGetLogs = createAsyncThunk<DoGetLogsReturn, DoGetLogsPayload>(
  "event/getLogs",
  async ({ ignoreState, callback }, { getState }) => {
    const { logs } = getState() as RootState;
    const params = ignoreState ? undefined : logs?.pageParams;
    try {
      const data = await getLogs(undefined, params);
      callback?.(null, data);
      return data;
    } catch (err: any) {
      callback?.(err, null);
      throw err;
    }
  }
);
