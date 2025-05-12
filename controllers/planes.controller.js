import { addPlane, getAllPlanesServices } from "../services/planes.service.js";

export const createPlane = async (req, res) => {
  const { registration, model, capacity, state } = req.body;

  try {
    const planes = await addPlane({
      registration,
      model,
      capacity,
      state,
    });

    if (!planes) {
      return res.status(400).json({ message: "Plane already exists" });
    }

    return res.status(201).json({
      message: "Plane created successfully",
      planes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating plane",
      error: error.message,
    });
  }
};

export const getAllPlanes = async (req, res) => {
  try {
    const planes = await getAllPlanesServices();

    if (!planes) {
      return res.status(404).json({ message: "No planes found" });
    }

    return res.status(200).json({
      message: "Planes retrieved successfully",
      planes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving planes",
      error: error.message,
    });
  }
};
