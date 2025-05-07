import { addAdmin, login } from "../services/admin.service.js";

export const createAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("Creating admin");

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
    console.log("Error creating admin", error);
    if (error.code === "EMAIL_EXISTS") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error while creating admin",
    });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await login(email, password);

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      expiresIn: 3600,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
