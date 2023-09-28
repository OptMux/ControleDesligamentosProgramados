import { createSlice } from "@reduxjs/toolkit";
import { type UserSliceState } from "./user.types";
import { doLogin, recoverSession } from "./userThunks";
import { performLogout } from "../../../services/auth";

const initialState: UserSliceState = {
  loggedUser: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      performLogout();
      state.loggedUser = null;
    },
  },
  extraReducers: (builder) => {
    [doLogin, recoverSession].forEach((reducer) => {
      builder.addCase(reducer.pending, (state) => {
        state.isLoading = true;
        state.loggedUser = null;
      });
      builder.addCase(reducer.fulfilled, (state, action) => {
        state.loggedUser = action.payload;
        state.isLoading = false;
      });
      builder.addCase(reducer.rejected, (state) => {
        state.isLoading = false;
        state.loggedUser = null;
      });
    });
  },
});

export const UserActions = userSlice.actions;
