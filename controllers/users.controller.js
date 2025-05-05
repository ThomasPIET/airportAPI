import { getAll, create, login } from "../services/users.service.js";

export const getAllUsers = async (res) => {
  res.status(201).json({
    success: true,
    users: await getAll(),
  });
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Call the service
  const userCreated = await create({ firstName, lastName, email, password });

  res.status(201).json({
    success: true,
    message: "User has been created",
    user: userCreated,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Call the service
  const token = await login(email, password);

  res.status(200).json({
    message: "User logged in",
    token,
  });
};
