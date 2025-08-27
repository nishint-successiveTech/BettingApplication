import { Request, Response } from "express";
import CricketMatchService from "../services/cricketMatchService";

class CricketMatchController {

  public static async getAllMatches(req: Request, res: Response) {
    try {
      const matches = await CricketMatchService.getAllMatches();
      res.status(200).json(matches);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public static async getMatchById(req: Request, res: Response) {
    try {
      const match = await CricketMatchService.getMatchById(req.params.id);
      if (!match) return res.status(404).json({ message: "Match not found" });
      res.status(200).json(match);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

 
  public static async createMatch(req: Request, res: Response) {
    try {
      const newMatch = await CricketMatchService.createMatch(req.body);
      res.status(201).json(newMatch);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // ✅ Update Match
  public static async updateMatch(req: Request, res: Response) {
    try {
      const updatedMatch = await CricketMatchService.updateMatch(
        req.params.id,
        req.body
      );
      if (!updatedMatch)
        return res.status(404).json({ message: "Match not found" });
      res.status(200).json(updatedMatch);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // ✅ Delete Match
  public static async deleteMatch(req: Request, res: Response) {
    try {
      const result = await CricketMatchService.deleteMatch(req.params.id);
      res
        .status(200)
        .json({
          message: result.deletedCount ? "Match deleted" : "Match not found",
        });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default CricketMatchController;
