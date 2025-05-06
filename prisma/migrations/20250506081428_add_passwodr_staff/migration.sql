/*
  Warnings:

  - Added the required column `email` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "availability" TEXT NOT NULL
);
INSERT INTO "new_Staff" ("availability", "firstName", "id", "lastName", "role") SELECT "availability", "firstName", "id", "lastName", "role" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
