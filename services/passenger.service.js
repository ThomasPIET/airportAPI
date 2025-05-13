import prisma from "../db.js";

export const createPassengerService = async (passengerData) => {
  const existingPassenger = await prisma.passenger.findFirst({
    where: {
      firstName: passengerData.firstName,
      lastName: passengerData.lastName,
      dateOfBirth: passengerData.dateOfBirth,
    },
  });

  if (existingPassenger) {
    throw new Error("Passenger already exists");
  }

  try {
    const passenger = await prisma.passenger.create({
      data: {
        ...passengerData,
      },
    });
    return passenger;
  } catch (error) {
    throw error;
  }
};

export const getAllPassengersServices = async () => {
  try {
    const passengers = await prisma.passenger.findMany();
    return passengers;
  } catch (error) {
    throw new Error("Error fetching passengers");
  }
};

export const getPassengersByIdServices = async (id) => {
  try {
    const passenger = await prisma.passenger.findUnique({
      where: { id: parseInt(id) },
    });
    return passenger;
  } catch (error) {
    throw new Error("Error fetching passenger by Id");
  }
};
