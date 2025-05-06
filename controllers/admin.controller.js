import { addAdmin } from "../services/admin.service.js";

export const createAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const staff = await addAdmin({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: staff,
    });
  } catch (error) {
    if (error.code === "EMAIL_EXISTS") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginAdmin = async (req, res) => {};
