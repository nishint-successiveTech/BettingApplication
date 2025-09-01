import MatchRepository from "../repositories/matchRepo";
import { IMatch } from "../models/matchModel";

class MatchService {
  public static async seedMatches() {
    const matches: IMatch[] = [
      {
        teamA: "India",
        teamB: "Australia",
        status: "live",
        startTime: new Date(),
      } as IMatch,
      {
        teamA: "England",
        teamB: "Pakistan",
        status: "upcoming",
        startTime: new Date(Date.now() + 3600000),
      } as IMatch,
      {
        teamA: "South Africa",
        teamB: "New Zealand",
        status: "completed",
        startTime: new Date(Date.now() - 7200000),
      } as IMatch,
    ];

    for (const match of matches) {
      await MatchRepository.createMatch(match);
    }

    return "Seeded match data!";
  }

  public static async getAllMatches() {
    return await MatchRepository.findAllMatches();
  }

  public static async getLiveMatches() {
    return await MatchRepository.findLiveMatches();
  }
}

export default MatchService;
