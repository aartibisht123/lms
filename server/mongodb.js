import mongoose from "mongoose";

// connect to the mongodb database

const connectDB = async () =>{
}

  try {
        await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }

export default connectDB;


