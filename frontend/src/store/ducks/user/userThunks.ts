import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./user.types";
import { performLogin, performRecoverSession } from "../../../services/auth";

interface LoginPayload {
  username: string;
  password: string;
  callback?: (err: Error | null, user: User | null) => void;
}

interface RecoverSessionPayload {
  callback?: (err: Error | null, user: User | null) => void;
}

export const doLogin = createAsyncThunk<User, LoginPayload>(
  "user/login",
  async ({ username, password, callback }) => {
    try {
      const data = await performLogin(username, password);
      callback?.(null, data);
      return data;
    } catch (err: any) {
      callback?.(err, null);
      throw err;
    }
  }
);

export const recoverSession = createAsyncThunk<User, RecoverSessionPayload>(
  "user/recoverSession",
  async ({ callback }) => {
    try {
      const data = await performRecoverSession();
      callback?.(null, data);
      return data;
    } catch (err: any) {
      callback?.(err, null);
      throw err;
    }
  }
);
