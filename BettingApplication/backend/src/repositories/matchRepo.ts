import Match, { IMatch } from "../models/matchModel";

class MatchRepository {
  public static async createMatch(matchData: IMatch) {
    const newMatch = new Match(matchData);
    return await newMatch.save();
  }

  public static async findAllMatches() {
    return await Match.find({});
  }

  public static async findLiveMatches() {
    return await Match.find({ status: "live" });
  }
}

export default MatchRepository;
