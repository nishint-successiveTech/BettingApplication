import { Router } from "express";
import CricketMatchController from "../controllers/cricketMatchController";

class CricketMatchRoutes {
  public static allroutes() {
    const router = Router();

    // ✅ Get all matches
    router.get("/all", CricketMatchController.getAllMatches);

    // ✅ Get match by ID
    router.get("/:id", CricketMatchController.getMatchById);

    // ✅ Create a new match
    router.post("/createMatch", CricketMatchController.createMatch);

    // ✅ Update a match by ID
    router.put("/updateMatch/:id", CricketMatchController.updateMatch);

    // ✅ Delete a match by ID
    router.delete("/deleteMatch/:id", CricketMatchController.deleteMatch);

    return router;
  }
}

export default CricketMatchRoutes;
