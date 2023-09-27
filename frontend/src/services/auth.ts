import { CookieName } from "../enums/auth";
import { User } from "../store/ducks/user/user.types";
import { withAuth, withoutAuth } from "./api";
import { ApiRoutes } from "./apiRoutes";
import Cookies from "js-cookie";

export async function performLogin(
  username: string,
  password: string
): Promise<User> {
  try {
    const {
      data: { data, token },
    } = await withoutAuth.post(ApiRoutes.login, {
      username,
      password,
    });
    Cookies.set(CookieName.Authorization, token, {
      path: "/",
      expires: 1,
    });
    return data?.user;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "login error");
  }
}

export async function performLogout() {
  Cookies.remove(CookieName.Authorization, {
    path: "/",
  });
}

export async function performRecoverSession(): Promise<User> {
  try {
    const {
      data: { data },
    } = await withAuth.get(ApiRoutes.recoverSession);
    return data?.user;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? "login error");
  }
}
