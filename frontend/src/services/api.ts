import axios from "axios";
import { settings } from "../utils/settings";
import Cookies from "js-cookie";
import { CookieName } from "../enums/auth";

export const withoutAuth = axios.create({
  baseURL: settings.apiUrl,
});

export const withAuth = axios.create({
  baseURL: settings.apiUrl,
});

withAuth.interceptors.request.use((config) => {
  const token = Cookies.get(CookieName.Authorization);
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
