import mongoose from "mongoose";
import { URI } from "../config/config.js";

export async function connectDB() {
  try {
    const db = await mongoose.connect(URI);
    console.log(`Connected to ${db.connection.name}`);
  } catch (error) {
    console.error(error);
  }
}
