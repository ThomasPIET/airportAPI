import prisma from "../db.js";

export const createRunwaysService = async (runway) => {
  const existing = await prisma.runway.findFirst({
    where: {
      identifier: runway.identifier,
    },
  });

  if (existing) throw new Error("Runway already exists");

  return await prisma.runway.create({
    data: {
      ...runway,
    },
  });
};

export const getAllRunwaysServices = async () => {
  const runways = await prisma.runway.findMany();

  return runways;
};

export const getRunwayByIdService = async (id) => {
  const runway = await prisma.runway.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!runway) throw new Error("Runway not found");

  return runway;
};
