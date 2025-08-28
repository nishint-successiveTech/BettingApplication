import { Application } from "express";
import express from "express";
import Database from "./config/database";
import UserRoutes from "./routes/userRoutes";
import MatchRoutes from "./routes/matchRoute";
import PlayerRoutes from "./routes/playerRoute"; // ✅ Import PlayerRoutes
import cors from "cors";
import CricketMatchController from "./controllers/cricketMatchController";
import CricketMatchRoutes from "./routes/cricketMatchRoute";
import WinnerController from "./controllers/winnerController";
import WinnerRoutes from "./routes/winnerRoute";

class AppServer {
  public static app: Application = express();

  public static async run() {
    await this.connectDB();
    this.app.use(cors());
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
    this.app.use("/api/matches", MatchRoutes.allRoutes());
    this.app.use("/api/players", PlayerRoutes.allRoutes()); // ✅ Register PlayerRoutes
    this.app.use("/api/cricketMatch", CricketMatchRoutes.allroutes());
  }
}

export default AppServer;
