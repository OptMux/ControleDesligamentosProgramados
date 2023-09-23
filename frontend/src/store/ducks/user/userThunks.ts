import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserRole } from "./user.types";

interface LoginPayload {
  username: string;
  password: string;
  callback?: () => void;
}

export const doLogin = createAsyncThunk<User, LoginPayload>(
  "user/login",
  async ({ username, password, callback }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(username, password);
    callback?.();
    return {
      id: password.length,
      name: username,
      role: UserRole.admin,
    } as User;
  }
);
