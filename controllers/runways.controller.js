import {
  createRunwaysService,
  getAllRunwaysServices,
  getRunwayByIdService,
} from "../services/runways.service.js";

export const createRunways = async (req, res) => {
  const { identifier, available } = req.body;

  try {
    const runways = await createRunwaysService({ identifier, available });
    return res.status(201).json({
      message: "Runway created successfully",
      runways,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllRunways = async (req, res) => {
  try {
    const runways = await getAllRunwaysServices();
    return res.status(200).json({
      message: "Runways retrieved successfully",
      runways,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getRunwaysById = async (req, res) => {
  const { id } = req.params;

  try {
    const runway = await getRunwayByIdService(id);
    if (!runway) {
      return res.status(404).json({
        message: "Runway not found",
      });
    }
    return res.status(200).json({
      message: "Runway retrieved successfully",
      runway,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
