import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

  if (!decoded) {
    res.status(403).send("you are not signed in");
  }
  res.adminId = decoded.id;
  next();
}
