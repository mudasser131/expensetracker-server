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

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration - Updated to include Netlify URL
const corsOptions = {
  origin: [
    "http://localhost:5173",  // Local frontend (dev)
    "http://localhost:5174",  // Local frontend (dev)
    "https://expenz05.netlify.app"  // Netlify frontend URL
  ],
  credentials: true,  // Allow credentials (cookies)
};

app.use(cors(corsOptions));

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
