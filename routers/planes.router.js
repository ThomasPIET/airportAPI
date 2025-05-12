import express from "express";

import { createPlane } from "../controllers/planes.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createPlane);

export default router;
