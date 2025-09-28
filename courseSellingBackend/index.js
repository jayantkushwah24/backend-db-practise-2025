import express from "express";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/courses.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

dotenv.config();

app.use("/user", userRouter);
app.use("/courses", courseRouter);

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
      console.log("db connected successfully");
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
