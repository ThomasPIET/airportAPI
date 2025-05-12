import express from "express";
import {
  createRunways,
  getAllRunways,
  getRunwaysById,
} from "../controllers/runways.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createRunways);

// Public routes
router.get("/", getAllRunways);
router.get("/:id", getRunwaysById);

export default router;
