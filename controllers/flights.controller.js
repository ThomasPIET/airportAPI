import { addFlight, getFlights } from "../services/flights.service.js";

export const createFlight = async (req, res) => {
  console.log("Creating flight");

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
