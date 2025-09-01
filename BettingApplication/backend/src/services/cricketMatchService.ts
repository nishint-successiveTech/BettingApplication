import CricketMatchRepository from "../repositories/cricketMatchRepo";
import { ICricketMatch } from "../models/cricketMatchModel";

class CricketMatchService {
  public static async getAllMatches(): Promise<ICricketMatch[]> {
    return await CricketMatchRepository.getAllMatches();
  }

  public static async getMatchById(id: string): Promise<ICricketMatch | null> {
    return CricketMatchRepository.getMatchById(id);
  }

  public static async createMatch(
    matchData: ICricketMatch
  ): Promise<ICricketMatch> {
    return CricketMatchRepository.createMatch(matchData);
  }

  public static async updateMatch(
    id: string,
    updateData: Partial<ICricketMatch>
  ): Promise<ICricketMatch | null> {
    return CricketMatchRepository.updateMatch(id, updateData);
  }

  public static async deleteMatch(
    id: string
  ): Promise<{ deletedCount?: number }> {
    return CricketMatchRepository.deleteMatch(id);
  }
}

export default CricketMatchService;
