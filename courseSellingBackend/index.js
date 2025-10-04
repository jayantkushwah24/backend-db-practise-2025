import express from "express";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/courses.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRouter from "./routes/admin.js";

const app = express();

app.use(express.json());

dotenv.config();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function connectDb() {
  try {
    await mongoose
      .connect(process.env.MONGODB_CONNECTION_URL_COURSE_SELLING)
      .then(() => {
        console.log("database connected successfully");
      });
    app.listen(3000, () => {
      console.log(
        "app is listening on the port 3000 from course selling backend"
      );
    });
  } catch (error) {
    console.error(error.message);
  }
}
connectDb();
