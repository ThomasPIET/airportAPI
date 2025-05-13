import express from "express";

import {
  createPlane,
  getAllPlanes,
  getPlaneById,
} from "../controllers/planes.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createPlane);

// Public routes
router.get("/", getAllPlanes);
router.get("/:id", getPlaneById);

export default router;
