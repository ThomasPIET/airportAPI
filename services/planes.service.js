import prisma from "../db.js";

export const addPlane = async (plane) => {
  const existing = await prisma.plane.findFirst({
    where: {
      registration: plane.registration,
    },
  });

  if (existing) throw new Error("Plane already exists");

  return await prisma.plane.create({
    data: {
      ...plane,
    },
  });
};

export const getAllPlanesServices = async () => {
  const planes = await prisma.plane.findMany();

  if (!planes) throw new Error("No planes found");

  return planes;
};

export const getPlaneByIdServices = async (id) => {
  const plane = await prisma.plane.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!plane) throw new Error("Plane not found");

  return plane;
};
