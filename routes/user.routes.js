import express from "express";
import { getCurrentUser, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user and set token cookie
router.post("/login", login);

// Logout user and clear token cookie
router.get("/logout", isAuthenticated, logout);

// Get current authenticated user
router.get("/me", isAuthenticated, getCurrentUser);

export default router;