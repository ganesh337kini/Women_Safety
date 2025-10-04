import jwt from "jsonwebtoken";
import User from "../schema/user-schema.js";

export const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      return next();
    }
    res.status(401).json({ message: "Not authorized, no token" });
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
