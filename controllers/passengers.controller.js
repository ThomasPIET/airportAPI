import {
  createPassengerService,
  getAllPassengersServices,
  getPassengersByIdServices,
} from "../services/passenger.service.js";

export const createPassenger = async (req, res) => {
  const { firstName, lastName, dateOfBirth } = req.body;

  try {
    const passenger = await createPassengerService({
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
    });
    return res.status(201).json({
      status: "success",
      message: "Passenger created successfully",
      data: passenger,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllPassengers = async (req, res) => {
  try {
    const passengers = await getAllPassengersServices();
    if (!passengers || passengers.length === 0) {
      return res.status(404).json({
        message: "No passengers found",
      });
    }

    res.status(200).json({
      message: "Passengers fetched successfully",
      passengers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching passengers",
      error: error.message,
    });
  }
};

export const getPassengersById = async (req, res) => {
  const { id } = req.params;

  try {
    const passenger = await getPassengersByIdServices(id);
    if (!passenger) {
      return res.status(404).json({
        message: "Passenger not found",
      });
    }

    res.status(200).json({
      message: "Passenger fetched successfully",
      passenger,
    });
  } catch (error) {}
};
