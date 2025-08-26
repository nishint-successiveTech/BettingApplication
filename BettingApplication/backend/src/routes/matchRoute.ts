import { Router } from "express";
import MatchController from "../controllers/mathController";

class MatchRoutes {
  public static allRoutes() {
    const router = Router();

    router.post("/seed", MatchController.seed);       // seed match data
    router.get("/all", MatchController.getAll);       // get all matches
    router.get("/live", MatchController.getLive);     // get live matches

    return router;
  }
}

export default MatchRoutes;
