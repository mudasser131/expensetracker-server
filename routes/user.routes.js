import express from "express";
import { getCurrentUser, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated, logout); 
router.route('/me').get(isAuthenticated, getCurrentUser)

export default router;