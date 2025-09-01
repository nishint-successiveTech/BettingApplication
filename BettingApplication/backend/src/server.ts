import { Application } from "express";
import express from "express";
import Database from "./config/database";
import UserRoutes from "./routes/userRoutes";
import MatchRoutes from "./routes/matchRoute";
import PlayerRoutes from "./routes/playerRoute";
import cors from "cors";
import CricketMatchRoutes from "./routes/cricketMatchRoute";
import ConfirmBetRoutes from "./routes/confrimBetRoute";
import EmailRoutes from "./routes/emailRoutes"; // ✅ Import EmailRoutes

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
    this.app.use("/api/players", PlayerRoutes.allRoutes());
    this.app.use("/api/cricketMatch", CricketMatchRoutes.allroutes());
    this.app.use("/api/confirmBet", ConfirmBetRoutes.allroutes());
    this.app.use("/api/email", EmailRoutes.allroutes()); 
  }
}

export default AppServer;
