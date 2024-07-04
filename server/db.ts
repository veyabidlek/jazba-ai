import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost:27017/"
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
