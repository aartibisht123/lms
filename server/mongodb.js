// import mongoose from "mongoose";

// // connect to the mongodb database

// const connectDB = async () =>{
//     mongoose.connection.on('connected', ()=> console.log('Database connected'))

//     await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "lms",
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};

export default connectDB;
