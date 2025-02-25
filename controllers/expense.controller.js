import { Expense } from "../models/expenseModel.js";
import mongoose from "mongoose";


export const  addExpense = async (req, res) =>  {

try {
    const userId = req.id
const {description, amount, category} = req.body;

if (!description || !amount || !category){

    return res.status(400).json({

        message : "all fields are required",
        success:false
    })
};
    
const expense = Expense.create({

    description,
    amount,
    category,
    userId
})

return res.status(201).json({

    message : "new expense added",
    expense,
    success:true
})

} catch (error) {
    console.log(error);
    
    
}


}



export  const getAllExpense = async (req,res) =>
    {

    try {

        const userId = req.id;
        let category = req.query.category || ""; // Default to empty string if category is not provided
        const done = req.query.done || ""; // Default to empty string if done is not provided

        const query = {
            userId, // Ensures only this user's expenses are fetched
        };
        
// Handle special case for category "all"
if (category.toLowerCase() === "all") {
    // No need to filter by category
} else {
    // Regular category filter with case-insensitive regex match
    query.category = { $regex: category, $options: 'i' };
}

if (done.toLowerCase() === "done") {
    query.done = true; // Get only completed expenses
} else if (done.toLowerCase() === "undone") {
    query.done = false; // Get only pending expenses
}

const expenses = await Expense.find(query);

if (!expenses || expenses.length === 0) {
    return res.status(404).json({
        message: "No expenses found.",
        success: false
    });
}


return res.status(200).json({
    expenses, // Send found expenses
    success: true
});



    } catch (error) {

        console.log(error);
        
        
    }

}

export const markAsDoneOrUndone = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const done = req.body;
        const expense = await Expense.findByIdAndUpdate(expenseId, done, { new: true });
        if (!expense) {
            return res.status(404).json({
                message: "Expense not found.",
                success: false
            })
        };
        return res.status(200).json({
            message: `Expense marked as ${expense.done ? 'done' : 'undone'}.`,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const removeExpense = async(req,res) => {

try {

    const expenseId = req.params.id;

await Expense.findByIdAndDelete(expenseId);

res.status(200).json({message: "expense removed",
    expenseId,
    success:true
})

    
} catch (error) {
    console.log(error);
    
}

}

export const updateExpense = async (req,res) =>
{

    try {
        const { description, amount, category } = req.body;
        const expenseId = req.params.id;
    
        // Validate expenseId
        if (!mongoose.Types.ObjectId.isValid(expenseId)) {
            return res.status(400).json({ message: "Invalid expense ID", success: false });
        }
    
        // Create update object
        const newData = { description, amount, category };
    
        // Update the expense
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, newData, { new: true });
    
        // Check if expense exists
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found", success: false });
        }
    
        res.status(200).json({
            message: "Expense updated successfully",
            success: true,
            expense: updatedExpense
        });
    
    } catch (error) {
    console.log(error);
    
}

}