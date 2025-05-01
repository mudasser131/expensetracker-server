import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Cookie token:", token);

    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "User is not authenticated", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decoded);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token", success: false });
    }
    return res.status(500).json({ message: "Server error during authentication", success: false });
  }
};

export default isAuthenticated;