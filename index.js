import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

dotenv.config();

const app = express();
const PORT = 4000;

// CORS configuration - Allow requests from your Netlify frontend
const corsOptions = {
  origin: [
    "http://localhost:5173",  // Local development URL
    "http://localhost:5174",  // Local development URL (if applicable)
    "https://expenz05.netlify.app"  // Your deployed frontend on Netlify
  ],
  credentials: true,  // Allow cookies/credentials to be included
};

app.use(cors(corsOptions));  // Use CORS middleware

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allow OPTIONS requests (preflight)
app.options('*', cors(corsOptions));  // Enable preflight handling for all routes

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/expense", expenseRoutes);

// Test route
app.get('/', (req, res) =>
  res.send(`Node and Express server running on port ${PORT}`)
);

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
