import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

const JWT_SECRET = "jayantlovemahi";

let users = [];

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  users.push({ username, password });

  res.json({
    message: "Signup successful",
    data: users,
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const isUserExist = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!isUserExist) {
    return res.status(401).json({ message: "User does not exist" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({
    message: "User signed in successfully",
    token,
  });
});

app.get("/me", (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Extract token if using "Bearer <token>"
    const token = authHeader.split(" ")[1];

    const userDetails = jwt.verify(token, JWT_SECRET);
    const username = userDetails.username;

    const user = users.find((u) => u.username === username);

    if (user) {
      return res.json({ username: user.username, password: user.password });
    }

    return res.status(401).json({ message: "User not found" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
