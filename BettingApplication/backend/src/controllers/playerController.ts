import { Request, Response } from "express";
import PlayerService from "../services/playerService";

class PlayerController {
  public static async getAllPlayers(req: Request, res: Response) {
    try {
      const players = await PlayerService.getAllPlayers();
      res.json(players);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  }
}

export default PlayerController;
