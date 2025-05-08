import prisma from "../db.js";

export const addFlight = async (flight) => {
  const existing = await prisma.flight.findFirst({
    where: {
      flightNumber: flight.flightNumber,
    },
  });

  if (existing) throw new Error("Flight already exists");

  return await prisma.flight.create({
    data: {
      ...flight,
      status: "ON_TIME",
    },
  });
};

export const getFlights = async () => {
  return await prisma.flight.findMany({
    include: {
      plane: true,
      crewAssignments: true,
    },
  });
};
