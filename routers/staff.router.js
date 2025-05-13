import express from "express";
import {
  getAllStaff,
  createStaff,
  getStaffById,
} from "../controllers/staff.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createStaff);

// Public routes
router.get("/", getAllStaff);
router.get("/:id", getStaffById);

export default router;
