import ConfirmBetService from "../services/confirmBetService";
import { Request, Response } from "express";

class ConfirmBetController {
  public static async confirmCreateBet(req: Request, res: Response) {
    const { matchId, teamId, userEmail, betAmount } = req.body;

    const createConfirmBet = await ConfirmBetService.confirmCreateBet({
      matchId: matchId,
      teamId: teamId,
      userEmail: userEmail,
      betAmount: betAmount,
    });
    res.status(200).json({
      success: true,
      data: createConfirmBet,
    });
  }

  public static async winnerDeclare(req: Request, res: Response) {
    const { matchId, teamId, userEmail, betAmount } = req.body;

    const winnerDeclare = await ConfirmBetService.winnerDeclare({
      matchId: matchId,
      teamId: teamId,
    });
    res.status(200).json({
      success: true,
      data: winnerDeclare,
    });
  }
}

export default ConfirmBetController;
