import { ApplicationMode } from "../enums/url";

export function getApiUrl(
  mode: ApplicationMode = ApplicationMode.production
): string {
  if (mode === ApplicationMode.development) return import.meta.env.VITE_API_URL;
  return [window.location.origin, "api"].join("/");
}
