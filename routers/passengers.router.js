import express from "express";

import {
  createPassenger,
  getAllPassengers,
  getPassengersById,
} from "../controllers/passengers.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Private routes
router.post("/", authMiddleware, createPassenger);

// Public routes
router.get("/", getAllPassengers);
router.get("/:id", getPassengersById);

export default router;
