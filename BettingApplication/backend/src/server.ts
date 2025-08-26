import { Application } from "express";
import express from "express";
import Database from "./config/database";
import UserRoutes from "./routes/userRoutes";
import cors from "cors"
class AppServer {
  public static app: Application = express();

  public static async run() {
    await this.connectDB();
    this.app.use(cors())
    this.app.use(express.json());
    this.getAllRoutes();
    this.Listen();
  }

  private static Listen() {
    const PORT = 8787;
    this.app.listen(PORT, () => {
      console.log("SERVER RUNNING ON PORT " + PORT);
    });
  }

  private static async connectDB() {
    try {
      await Database.connect();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  }

  private static getAllRoutes() {
    this.app.use("/api/users", UserRoutes.allroutes());
  }
  
}

export default AppServer;
