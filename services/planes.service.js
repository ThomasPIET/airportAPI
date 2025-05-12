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
