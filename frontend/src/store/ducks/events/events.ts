import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { EventsSliceState, SystemEvent } from "./events.types";
import { idFactory } from "../../../utils/generators";

const ids = idFactory();

const initialState: EventsSliceState = {
  events: [
    {
      id: 1,
      title: "Event 1",
      description: "lorem ipsum dolor sit amet",
      startDate: Date.now(),
      finishDate: Date.now() + 60000,
    },
    {
      id: 2,
      title: "Event 2",
      description: "lorem ipsum dolor sit amet 2",
      startDate: Date.now() + 60000,
      finishDate: Date.now() + 60000 + 60000,
    },
  ],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<SystemEvent, "id">>) => {
      state.events.push({ id: ids.nextId(), ...action.payload });
    },
  },
});
