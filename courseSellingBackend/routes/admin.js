import { Router } from "express";
import { adminModel, courseModel } from "../utils/databaseSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod";
import { adminMiddleware } from "../middleware/admin.js";

dotenv.config();

const adminRouter = Router();

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

adminRouter.post("/signup", async (req, res) => {
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
    const admin = await adminModel.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    res.json({
      message: "admin signup successfull",
      data: admin,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error creating admin", error: err.message });
  }
});

adminRouter.get("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    res.json({
      message: "admin does not exist",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET_ADMIN, {
    expiresIn: "1h",
  });

  res.json({
    message: "admin signin successfully",
    token: token,
  });
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });

  res.json({
    message: "course created successfully",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      description,
      imageUrl,
      price,
    }
  );

  res.json({
    message: "course updated successfully",
    courseId: course._id,
  });
});

adminRouter.get("/coureses/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "all courses fetched successfully",
    data: courses,
  });
});

export default adminRouter;
