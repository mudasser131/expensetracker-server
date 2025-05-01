import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashedPassword });

    return res.status(201).json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "Strict", // For development use 'Strict', for production with HTTPS use 'None' and `secure: true`
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: { _id: user._id, fullname: user.fullname, email: user.email },
        token,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Get user error:", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
