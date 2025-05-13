import express from "express";
import {
  createFlight,
  getAllFlights,
  getFlightById,
} from "../controllers/flights.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createFlight);

// Public routes
router.get("/", getAllFlights);
router.get("/:id", getFlightById);

export default router;
