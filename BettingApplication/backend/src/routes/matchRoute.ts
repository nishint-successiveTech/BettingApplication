import { Router } from "express";
import MatchController from "../controllers/mathController";

class MatchRoutes {
  public static allRoutes() {
    const router = Router();

    router.post("/seed", MatchController.seed);
    router.get("/all", MatchController.getAll);
    router.get("/live", MatchController.getLive);

    return router;
  }
}

export default MatchRoutes;
