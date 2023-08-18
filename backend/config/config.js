import dotenv from "dotenv";
dotenv.config();

export const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/testdb";
export const PORT = process.env.PORT || 5000;
