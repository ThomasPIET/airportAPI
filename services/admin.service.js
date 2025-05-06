import prisma from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addAdmin = async (admin) => {
  const existing = await prisma.admin.findFirst({
    where: {
      email: admin.email,
    },
  });

  if (existing) {
    console.log("Email already exists");
    const error = new Error("Email already exists");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  const encryptedPassword = bcrypt.hashSync(
    admin.password,
    parseInt(process.env.BCRYPT_SALT_ROUNDS)
  );

  return await prisma.admin.create({
    data: {
      ...admin,
      password: encryptedPassword,
    },
    select: {
      id: true,
      email: true,
    },
  });
};

export const login = async (email, password) => {
  const user = await prisma.admin.findFirst({
    where: {
      email,
    },
  });

  if (!user) throw new Error("admin not found");

  // Not safe to returns this to end admin
  if (!bcrypt.compareSync(password, admin.password))
    throw new Error("Invalid password");

  // Generate a token here
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};
