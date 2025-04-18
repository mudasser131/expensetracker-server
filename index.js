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

// ✅ CORS configuration - allow requests from local and Netlify frontend
const corsOptions = {
  origin: [
    "http://localhost:5173",        // Local dev URL
    "http://localhost:5174",        // Optional local dev
    "https://expenz05.netlify.app"  // Your deployed Netlify frontend
  ],
  credentials: true, // ✅ Allow cookies/credentials
};

// ✅ Use CORS middleware with correct options for all routes
app.use(cors(corsOptions)); // This will handle both preflight (OPTIONS) and actual requests

// ✅ Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.options('*', cors(corsOptions));


// ✅ Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/expense", expenseRoutes);

// ✅ Test route
app.get('/', (req, res) =>
  res.send(`Node and Express server running on port ${PORT}`)
);

// ✅ Connect to the database
connectDB();

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
