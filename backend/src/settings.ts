import dotenv from "dotenv";
dotenv.config();

export const settings = {
  jwtSecret: process.env?.JWT_SECRET ?? "changethis",
  shaSecret: process.env?.SHA_SECRET ?? "changethis",
  port: process.env?.PORT ?? 3000,
  defaultUsername: process.env?.DEFAULT_USERNAME ?? "admin",
  defaultPassword: process.env?.DEFAULT_PASSWORD ?? "admin",
  debugMode: process.env.DEBUG_MODE === "true",
};
