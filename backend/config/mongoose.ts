import mongoose from "mongoose";
import "dotenv/config";

const mongoURL = process.env.DB_URL as string;
export const connectMongoDB = () =>
  mongoose
    .connect(mongoURL as string)
    .then(() => console.log("Successfully connected to MongoDB."));

export const disconnectMongoDb = () =>
  mongoose
    .disconnect()
    .then(() => console.log("DB disconnected successfully."));
