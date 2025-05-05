-- CreateTable
CREATE TABLE "flights" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "flight_number" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departure_time" DATETIME,
    "arrival_time" DATETIME,
    "gate" TEXT,
    "status" TEXT NOT NULL DEFAULT 'scheduled'
);

-- CreateTable
CREATE TABLE "runways" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available'
);

-- CreateTable
CREATE TABLE "runway_availability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "runway_id" INTEGER NOT NULL,
    "available_from" DATETIME,
    "available_to" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'available',
    CONSTRAINT "runway_availability_runway_id_fkey" FOREIGN KEY ("runway_id") REFERENCES "runways" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "flights_flight_number_key" ON "flights"("flight_number");

-- CreateIndex
CREATE UNIQUE INDEX "runways_name_key" ON "runways"("name");
