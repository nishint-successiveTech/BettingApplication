import CricketMatchModel, { ICricketMatch } from "../models/cricketMatchModel";

class CricketMatchRepository {
  public static async getAllMatches(): Promise<ICricketMatch[]> {
    return await CricketMatchModel.find().sort({ dateTimeGMT: 1 });
  }

  public static async getMatchById(id: string): Promise<ICricketMatch | null> {
    return await CricketMatchModel.findOne({ id });
  }

  public static async createMatch(
    matchData: ICricketMatch
  ): Promise<ICricketMatch> {
    const match = new CricketMatchModel(matchData);
    return match.save();
  }

  public static async updateMatch(
    id: string,
    updateData: Partial<ICricketMatch>
  ): Promise<ICricketMatch | null> {
    return CricketMatchModel.findOneAndUpdate({ id }, updateData, {
      new: true,
    });
  }

  public static async deleteMatch(
    id: string
  ): Promise<{ deletedCount?: number }> {
    return CricketMatchModel.deleteOne({ id });
  }
}

export default CricketMatchRepository;
