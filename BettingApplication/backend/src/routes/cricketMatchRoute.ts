import { Router } from "express";
import CricketMatchController from "../controllers/cricketMatchController";

class CricketMatchRoutes {
  public static allroutes() {
    const router = Router();

    router.get("/all", CricketMatchController.getAllMatches);

    router.get("/:id", CricketMatchController.getMatchById);

    router.post("/createMatch", CricketMatchController.createMatch);

    router.put("/updateMatch/:id", CricketMatchController.updateMatch);

    router.delete("/deleteMatch/:id", CricketMatchController.deleteMatch);

    return router;
  }
}

export default CricketMatchRoutes;
