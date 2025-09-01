// routes/PlayerRoutes.ts
import { Router } from "express";
import PlayerController from "../controllers/playerController";

class PlayerRoutes {
  public static allRoutes() {
    const router = Router();

    router.get("/all", PlayerController.getAllPlayers);

    return router;
  }
}

export default PlayerRoutes;
