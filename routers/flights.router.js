import express from "express";
import {
  createFlight,
  getAllFlights,
} from "../controllers/flights.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createFlight);
router.get("/", authMiddleware, getAllFlights);
/* router.get("/:id", authMiddleware, getFlightById);
 */
export default router;
