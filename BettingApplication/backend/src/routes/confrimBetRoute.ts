import { Router } from "express";
import ConfirmBetController from "../controllers/confirmBetController";

class ConfirmBetRoutes {
  public static allroutes() {
    const router = Router();

    // ✅ Get all matches
    router.post("/create", ConfirmBetController.confirmCreateBet);
    router.post("/winner", ConfirmBetController.winnerDeclare);

    return router;
  }
}

export default ConfirmBetRoutes;
