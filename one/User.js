// 9.
import mongoose from "mongoose";

const UserModel = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", UserModel);

export default User;
