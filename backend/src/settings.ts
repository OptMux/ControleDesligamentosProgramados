import JSON5 from "json5";
import dotenv from "dotenv";
dotenv.config();

export const settings = {
  jwtSecret: process.env?.JWT_SECRET ?? "changethis",
  shaSecret: process.env?.SHA_SECRET ?? "changethis",
  port: process.env?.PORT ?? 3000,
  defaultUsername: process.env?.DEFAULT_USERNAME ?? "admin",
  defaultPassword: process.env?.DEFAULT_PASSWORD ?? "admin",
  debugMode: process.env.DEBUG_MODE === "true",
  purgeLimitByMonths: parseInt(process.env.PURGE_LIMIT_BY_MONTHS ?? "1"),
  outputPin: parseInt(process.env.OUTPUT_PIN ?? "0"),
  inputPin: parseInt(process.env.INPUT_PIN ?? "0"),
  alarmPin: parseInt(process.env.ALARM_PIN ?? "0"),
  outputPinPulseTimeoutInSeconds: parseInt(
    process.env.OUTPUT_PIN_PULSE_TIMEOUT_IN_SECONDS ?? "5"
  ),
  alarmPinPulseTimeoutInSeconds: parseInt(
    process.env.ALARM_PIN_PULSE_TIMEOUT_IN_SECONDS ?? "60"
  ),
  inputPinReadDelayInSeconds: parseInt(
    process.env.INPUT_PIN_READ_DELAY_IN_SECONDS ?? "30"
  ),
};
