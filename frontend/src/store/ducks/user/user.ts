import { createSlice } from "@reduxjs/toolkit";
import { UserRole, type UserSliceState } from "./user.types";
import { doLogin } from "./userThunks";

const initialState: UserSliceState = {
  loggedUser: {
    id: 0,
    name: "Hideki",
    role: UserRole.admin,
  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.loggedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.pending, (state) => {
      state.isLoading = true;
      state.loggedUser = null;
    });
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      console.log(action.error);
      state.isLoading = false;
      state.loggedUser = null;
    });
  },
});

export const UserActions = userSlice.actions;
