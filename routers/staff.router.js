import express from "express";
import {
  getAllStaff,
  createStaff,
  getStaffById,
} from "../controllers/staff.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.get("/", authMiddleware, getAllStaff);
router.get("/:id", authMiddleware, getStaffById);
router.post("/", authMiddleware, createStaff);

export default router;
