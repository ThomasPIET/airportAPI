import express from "express";

import { createPlane, getAllPlanes } from "../controllers/planes.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createPlane);
router.get("/", authMiddleware, getAllPlanes);

export default router;
