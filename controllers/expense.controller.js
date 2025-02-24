import { Expense } from "../models/expenseModel.js";


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
    success:false
})

} catch (error) {
    console.log(error);
    
    
}


}

const getAllExpense = async (req,res) =>
    {

    try {

        // stopped at 16 min part 4
        
    } catch (error) {

        console.log(error);
        
        
    }



}

