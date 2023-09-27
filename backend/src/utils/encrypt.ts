import { pbkdf2 } from "node:crypto";
import { settings } from "../settings";

export function encryptPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    pbkdf2(password, settings.shaSecret, 1000000, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve(key.toString("utf-8"));
    });
  });
}

export async function verifyPassword(hash: string, password: string) {
  const passwordHash = await encryptPassword(password);
  return hash === passwordHash;
}
