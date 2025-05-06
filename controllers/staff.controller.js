import { getAll, addStaff } from "../services/staff.service.js";

export const getAllStaff = async (res) => {
  res.status(201).json({
    success: true,
    staff: await getAll(),
  });
};

export const createStaff = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    availability,
    crewAssignement,
  } = req.body;

  console.log("Creating staff", req.body);

  try {
    const user = await addStaff({
      firstName,
      lastName,
      email,
      password,
      role,
      availability,
      crewAssignement,
    });

    res.status(201).json({
      message: "Staff member created",
      user,
    });
  } catch (err) {
    if (err.code === "EMAIL_EXISTS") {
      return res.status(409).json({ message: "Email already in use" });
    }

    console.error("Error creating staff:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
