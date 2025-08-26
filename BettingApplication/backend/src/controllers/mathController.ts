import { Request, Response } from "express";
import MatchService from "../services/matchService";

class MatchController {
  public static async seed(req: Request, res: Response) {
    try {
      const message = await MatchService.seedMatches();
      res.status(200).json({ message });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const matches = await MatchService.getAllMatches();
      res.status(200).json(matches);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  public static async getLive(req: Request, res: Response) {
    try {
      const matches = await MatchService.getLiveMatches();
      res.status(200).json(matches);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

export default MatchController;
