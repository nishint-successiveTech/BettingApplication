// routes/PlayerRoutes.ts
import { Router } from "express";
import PlayerController from "../controllers/playerController";

class PlayerRoutes {
  public static allRoutes() {
    const router = Router();

    router.get("/all", PlayerController.getAllPlayers); // get all players
    // agar future me seed/add/delete chahiye to yahan add kar sakte ho

    return router;
  }
}

export default PlayerRoutes;
