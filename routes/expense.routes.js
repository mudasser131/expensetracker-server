import express from "express"
import { addExpense } from "../controllers/expense.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
  const router = express.Router();
   

  router.route('/add').post(isAuthenticated,  addExpense )

  export default router;
  