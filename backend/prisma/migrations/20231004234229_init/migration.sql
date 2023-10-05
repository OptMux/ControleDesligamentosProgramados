-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SystemEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "finishDate" DATETIME NOT NULL,
    "startedAt" DATETIME,
    "finishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SystemEvent" ("description", "finishDate", "finishedAt", "id", "startDate", "startedAt", "title") SELECT "description", "finishDate", "finishedAt", "id", "startDate", "startedAt", "title" FROM "SystemEvent";
DROP TABLE "SystemEvent";
ALTER TABLE "new_SystemEvent" RENAME TO "SystemEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
