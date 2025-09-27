import express from "express";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/courses.js";

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/courses", courseRouter);

app.listen(3000, () => {
  console.log("app is listening on the port 3000 from course selling backend");
});
