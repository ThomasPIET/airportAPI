import prisma from "../db.js";

export const getAll = async () => {
  return await prisma.staff.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      availability: true,
    },
  });
};

export const addStaff = async (staff) => {
  const existing = await prisma.staff.findFirst({
    where: {
      email: staff.email,
    },
  });

  if (existing) {
    console.log("Email already exists");
    const error = new Error("Email already exists");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  return await prisma.staff.create({
    data: {
      ...staff,
    },
    select: {
      id: true,
      email: true,
    },
  });
};
