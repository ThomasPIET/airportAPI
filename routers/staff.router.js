import express from "express";
import { getAllStaff, createStaff } from "../controllers/staff.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.get("/", authMiddleware, getAllStaff);

// Public routes
router.post("/", createStaff);

export default router;
