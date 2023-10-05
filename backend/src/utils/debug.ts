import { settings } from "../settings";

export const Debug = Object.freeze({
  log: (...messages: string[]) => {
    if (settings.debugMode)
      console.log(`[${new Date().toISOString()}]:`, ...messages);
  },
});
