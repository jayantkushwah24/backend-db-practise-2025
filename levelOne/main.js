import { log } from "console";
import express from "express";
import { consoleLog } from "./middleware.js";
import { dbConnect } from "./dbConnect.js";
import User from "./User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const { name, email, password, age } = req.body;
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      age,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "user registration successfull",
    });
  } catch (error) {
    res.status(400).send(error.message);
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

app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allowedUpdates = ["name", "age"];
    const user = await User.findOne({ _id: id });
    const newData = req.body;
    for (const key of Object.keys(newData)) {
      if (!allowedUpdates.includes(key)) {
        throw new Error("Invalid update field: " + key);
      }
      user[key] = newData[key];
    }
    await user.save();
    res.json({
      message: "updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Deleted successfully",
      deletedUser: user,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 12.
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("invalid password");
    }

    const token = jwt.sign({ _id: user._id }, "jayu1234", {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "Login successfull",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
