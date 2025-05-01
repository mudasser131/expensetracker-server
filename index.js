import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://expenz05.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("CORS Origin:", origin); // Log origin for debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware first
app.use(cors(corsOptions));

// Log preflight requests
app.options("*", cors(corsOptions), (req, res) => {
  console.log("Preflight OPTIONS request received for:", req.originalUrl);
  res.status(204).end();
});

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/expense", expenseRoutes);

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