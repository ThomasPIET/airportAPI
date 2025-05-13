import {
  addFlight,
  getFlights,
  flightById,
} from "../services/flights.service.js";

export const createFlight = async (req, res) => {
  const {
    flightNumber,
    destination,
    gate,
    departureTime,
    arrivalTime,
    capacity,
    planeId,
    crewIds,
  } = req.body;

  try {
    const flight = await addFlight({
      flightNumber,
      destination,
      gate,
      departureTime: new Date(departureTime),
      arrivalTime: new Date(arrivalTime),
      capacity: capacity || 0,
      planeId: planeId || null,
    });

    res.status(201).json({
      message: "Flight created successfully",
      flight,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating flight",
      error: error.message,
    });
  }
};

export const getAllFlights = async (req, res) => {
  try {
    const flights = await getFlights();
    if (!flights || flights.length === 0) {
      return res.status(404).json({
        message: "No flights found",
      });
    }

    res.status(200).json({
      message: "Flights fetched successfully",
      flights,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching flights",
      error: error.message,
    });
  }
};

export const getFlightById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid flight ID",
    });
  }
  try {
    const flight = await flightById(id);
    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
      });
    }

    res.status(200).json({
      message: "Flight fetched successfully",
      flight,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching flight",
      error: error.message,
    });
  }
};
