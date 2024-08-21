import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

/**
 * @type {typeof mongoose | undefined}
 * */
let dbInstance = undefined;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    dbInstance = connectionInstance;

    console.log(
      `\n☘️ MongoDB Connected DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
