import { Expense } from "../models/expenseModel.js";
import mongoose from "mongoose";

export const addExpense = async (req, res) => {
  try {
    const userId = req.userId; // From isAuthenticated middleware
    const { description, amount, category } = req.body;

    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const expense = await Expense.create({
      description,
      amount,
      category,
      userId,
    });

    return res.status(201).json({
      message: "New expense added",
      expense,
      success: true,
    });
  } catch (error) {
    console.error("Add expense error:", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const userId = req.userId; // From isAuthenticated middleware
    let { category, done } = req.query; // Optional query params
    category = category ? category.toLowerCase() : "";
    done = done ? done.toLowerCase() : "";

    const query = { userId }; // Only fetch user's expenses

    // Filter by category (skip if empty or "all")
    if (category && category !== "all") {
      query.category = { $regex: category, $options: "i" }; // Case-insensitive
    }

    // Filter by done status
    if (done === "done") {
      query.done = true;
    } else if (done === "undone") {
      query.done = false;
    }

    const expenses = await Expense.find(query);

    if (expenses.length === 0) {
      return res.status(404).json({
        message: "No expenses found",
        success: false,
      });
    }

    return res.status(200).json({
      expenses,
      success: true,
    });
  } catch (error) {
    console.error("Get expenses error:", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const markAsDoneOrUndone = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { done } = req.body; // Expect { done: true/false }
    const userId = req.userId;

    if (typeof done !== "boolean") {
      return res.status(400).json({
        message: "Done status must be a boolean",
        success: false,
      });
    }

    const expense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId }, // Ensure user owns the expense
      { done },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found or not authorized",
        success: false,
      });
    }

    return res.status(200).json({
      message: `Expense marked as ${expense.done ? "done" : "undone"}`,
      expense,
      success: true,
    });
  } catch (error) {
    console.error("Mark expense error:", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.userId;

    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found or not authorized",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Expense removed",
      expenseId,
      success: true,
    });
  } catch (error) {
    console.error("Delete expense error:", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const userId = req.userId;
    const expenseId = req.params.id;
    const { description, amount, category } = req.body;

    // Validate expenseId
    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(400).json({
        message: "Invalid expense ID",
        success: false,
      });
    }

    // Create update object
    const newData = {};
    if (description) newData.description = description;
    if (amount !== undefined) newData.amount = amount;
    if (category) newData.category = category;

    // Update the expense
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId }, // Ensure user owns the expense
      newData,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found or not authorized",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
      success: true,
    });
  } catch (error) {
    console.error("Update expense error:", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};