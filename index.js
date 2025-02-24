import express from 'express';

import dotenv from "dotenv";

import cors from "cors";

import cookieParser from 'cookie-parser'
import connectDB from './database/db.js';

import userRoutes from "./routes/user.routes.js"
import expenseRoutes from "./routes/expense.routes.js"


dotenv.config({});




const app = express();
const PORT = 4000;

// middleware
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const corsOptions = {
  origin:"http://localhost:5173",
  credentials:true
}
app.use(cors(corsOptions));

// apis

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/expense", expenseRoutes)


app.get('/', (req, res) =>
  res.send(`Node and express server running on port ${PORT}`)

)

connectDB();


app.listen(PORT, () =>{


console.log(`Your server is running on port ${PORT}`)   } )