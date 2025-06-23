-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('ON_TIME', 'DELAYED', 'CANCELLED', 'LANDED');

-- CreateEnum
CREATE TYPE "PlaneState" AS ENUM ('ACTIVE', 'MAINTENANCE', 'GROUNDED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PILOT', 'CABIN');

-- CreateEnum
CREATE TYPE "StaffAvailability" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "gate" TEXT,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "status" "FlightStatus" NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "planeId" INTEGER,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plane" (
    "id" SERIAL NOT NULL,
    "registration" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "state" "PlaneState" NOT NULL,

    CONSTRAINT "Plane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "availability" "StaffAvailability" NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "flightId" INTEGER NOT NULL,
    "passengerId" INTEGER NOT NULL,
    "seat" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runway" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "maintenanceFrom" TIMESTAMP(3),
    "maintenanceTo" TIMESTAMP(3),

    CONSTRAINT "Runway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffFlight" (
    "flightId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "StaffFlight_pkey" PRIMARY KEY ("flightId","staffId")
);

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_planeId_fkey" FOREIGN KEY ("planeId") REFERENCES "Plane"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffFlight" ADD CONSTRAINT "StaffFlight_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffFlight" ADD CONSTRAINT "StaffFlight_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
