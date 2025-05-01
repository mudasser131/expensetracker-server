import express from "express";
import {
  addExpense,
  getAllExpenses,
  markAsDoneOrUndone,
  removeExpense,
  updateExpense,
} from "../controllers/expense.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Add a new expense
router.route("/add").post(isAuthenticated, addExpense);

// Get all expenses for the authenticated user
router.route("/getall").get(isAuthenticated, getAllExpenses);

// Update an expense
router.route("/update/:id").put(isAuthenticated, updateExpense);

// Delete an expense
router.route("/remove/:id").delete(isAuthenticated, removeExpense);

// Mark an expense as done or undone
router.route("/mark-done/:id").put(isAuthenticated, markAsDoneOrUndone);

export default router;