import { getAll, addStaff, getStaffMember } from "../services/staff.service.js";

export const getAllStaff = async (req, res) => {
  return res.status(201).json({
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

export const getStaffById = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await getStaffMember(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    return res.status(200).json({
      success: true,
      staff,
    });
  } catch (error) {
    console.error("Error fetching staff by ID:", error);
    return res.status(500).json({
      message: "Internal server error while searching staff member by ID",
    });
  }
};
