import { log } from "console";
import express from "express";
import { consoleLog } from "./middleware.js";
import { dbConnect } from "./dbConnect.js";
import User from "./User.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// basic level question

// 1.
app.get("/hello", (req, res) => {
  res.send("Hello, Jayant!");
});

// 2.
app.get("/info", (req, res) => {
  res.json({
    name: "jayant",
    age: "25",
    "favourite programming language": "javascript",
  });
});

// 3.
app.get("/greet", (req, res) => {
  res.send(`Hello! ${req.query.name}`);
});

// 4.
app.get("/user/:id", (req, res) => {
  res.send(`User Id is ${req.params.id}`);
});

// 5.
app.get("/add", consoleLog, (req, res) => {
  const a = parseFloat(req.query.num1);
  const b = parseFloat(req.query.num2);
  const sum = a + b;
  res.send(`${a} + ${b} = ${sum}`);
});

// 7.
const connectDb = async function () {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`app is listening on the port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
connectDb();

// 10.
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("user created successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    
    res.status(201).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "user not exists",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({
      message: "fetched all users successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed to fetch user",
    });
  }
});
