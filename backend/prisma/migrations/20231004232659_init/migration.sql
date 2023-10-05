/*
  Warnings:

  - Added the required column `source` to the `SystemLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SystemLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SystemLog" ("createdAt", "id", "message") SELECT "createdAt", "id", "message" FROM "SystemLog";
DROP TABLE "SystemLog";
ALTER TABLE "new_SystemLog" RENAME TO "SystemLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
