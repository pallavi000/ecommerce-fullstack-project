import { connectMongoDB, disconnectMongoDb } from "../mongoose";
import mongoose from "mongoose";
import { appSeeder } from "./appSeeder";

async function fresh() {
  try {
    await connectMongoDB();

    // clear db
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
    console.log("DB cleared successully.");
    // seed
    await appSeeder();
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await disconnectMongoDb();
  }
}

// Run the seeder
fresh();
