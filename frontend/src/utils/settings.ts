import type { ApplicationMode } from "../enums/url";
import { getApiUrl } from "./urlUtils";

const MODE: ApplicationMode = import.meta.env.VITE_MODE;

export const settings = {
  mode: MODE,
  apiUrl: getApiUrl(MODE),
};
