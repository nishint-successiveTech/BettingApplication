import mongoose from "mongoose";

class Database {
  public static async connect() {
    try {
      await mongoose.connect("mongodb://localhost:27017/");
    } catch (e: any) {
      console.error("DB NOT CONNECTED: " + e.message);
    }
  }
}

export default Database;
