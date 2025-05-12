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
router.get("/", authMiddleware, getAllPlanes);
router.get("/:id", authMiddleware, getPlaneById);

export default router;
