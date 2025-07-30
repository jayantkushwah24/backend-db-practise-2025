import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async function () {
  const connect = await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("database connected successfully"))
    .catch((error) => console.log(error));
};
