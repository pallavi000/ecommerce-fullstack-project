import { connectMongoDB, disconnectMongoDb } from "../mongoose";
import { appSeeder } from "./appSeeder";

async function seed() {
  try {
    await connectMongoDB();
    await appSeeder();
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await disconnectMongoDb();
  }
}

// Run the seeder
seed();
