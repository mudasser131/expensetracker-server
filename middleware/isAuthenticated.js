import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User is not authenticated", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(500).json({ message: "Server error during authentication", success: false });
  }
};

export default isAuthenticated;
