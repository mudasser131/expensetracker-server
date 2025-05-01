import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

dotenv.config();

const app = express();

// CORS configuration - allow requests from local and Netlify frontend
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local dev URL
    "http://localhost:5174", // Optional local dev
    "https://expenz05.netlify.app", // Deployed Netlify frontend
  ],
  credentials: true, // Allow cookies/credentials
  allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
};

// Use CORS middleware with correct options for all routes
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options("*", cors(corsOptions));

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/expense", expenseRoutes); // Ensure expense routes use isAuthenticated middleware

// Test route
app.get("/", (req, res) =>
  res.send(`Node and Express server running on port ${process.env.PORT || 4000}`)
);

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});