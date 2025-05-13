import prisma from "../db.js";

export const addFlight = async (flight) => {
  const existing = await prisma.flight.findFirst({
    where: {
      flightNumber: flight.flightNumber,
    },
  });

  if (existing) throw new Error("Flight already exists");

  const { planeId, ...flightData } = flight;

  try {
    return await prisma.flight.create({
      data: {
        ...flightData,
        status: "ON_TIME",
        plane: {
          connect: {
            id: planeId,
          },
        },
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Plane not found");
    }

    throw new Error("Error creating flight");
  }
};

export const getFlights = async () => {
  return await prisma.flight.findMany({
    include: {
      plane: true,
      crewAssignments: true,
    },
  });
};

export const flightById = async (id) => {
  return await prisma.flight.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      plane: true,
      crewAssignments: true,
    },
  });
};
