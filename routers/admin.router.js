import express from "express";
import { createAdmin, loginAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

// Public routes
router.post("/register", createAdmin);
router.post("/login", loginAdmin);

export default router;
