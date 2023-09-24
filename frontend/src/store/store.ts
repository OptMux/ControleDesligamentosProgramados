import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./ducks/user/user";
import { logsSlice } from "./ducks/logs/logs";
import { eventsSlice } from "./ducks/events/events";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    logs: logsSlice.reducer,
    events: eventsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
