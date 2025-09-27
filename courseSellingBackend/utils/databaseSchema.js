import mongoose, { Schema } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const userSchema = Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const adminSchema = Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const courseSchema = Schema({
  description: String,
  price: Number,
  imageUrl: String,
  title: String,
  creatorId: ObjectId,
});

const purchaseSchema = Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

export const userModel = mongoose.model("user", userSchema);
export const adminModel = mongoose.model("admin", adminSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);
