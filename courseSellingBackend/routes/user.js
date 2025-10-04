import { Router } from "express";
import { userModel } from "../utils/databaseSchema.js";
import jwt from "jsonwebtoken";
import z from "zod";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const userRouter = Router();

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

userRouter.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }
  const { firstName, lastName, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    res.json({
      message: "signup successfull",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    res.json({
      message: "user does not exist",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_USER,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    message: "user signin successfully",
    token: token,
  });
});

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "purchases endpoint",
  });
});

export default userRouter;
