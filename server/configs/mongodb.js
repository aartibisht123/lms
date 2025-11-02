import mongoose from "mongoose";

// connect to the mongodb database

const connectDB = async () =>{
  mongoose.connection.on('connected', ()=> console.log('database connected'))
       await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}

  try {
   
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }

export default connectDB;


