import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env file");
    }
    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected!");
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ DB Connection Error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Database disconnected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/JobGati`);

  } catch (error) {
    console.log("❌ Error connecting to database:", error.message);
    process.exit(1);
  }
};
export default connectDB;
