// import mongoose from "mongoose";

// // connect to the mongodb database

// const connectDB = async () =>{
//     mongoose.connection.on('connected', ()=> console.log('Database connected'))

//     await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
// }

//   try {
//     console.log("✅ MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error.message);
//   }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");

    mongoose.connection.on("connected", () => {
      console.log("📡 Database connection established");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Database connection error:", err);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // optional: stop server if db fails
  }
};

export default connectDB;

