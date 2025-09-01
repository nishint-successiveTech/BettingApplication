import { IBet } from "../models/betModel";
import betModel from "../models/betModel";

class BetRepository {
 
  public static async createBet(betData: Partial<IBet>) {
    const bet = new betModel(betData);
    return await bet.save();
  }

  public static async findById(id: string) {
    return await betModel.findById(id).populate("user");
  }


  public static async getAllBets() {
    return await betModel.find().populate("user");
  }


  public static async getBetsByUserId(userId: string) {
    return await betModel.find({ user: userId }).populate("user");
  }


  public static async updateBet(id: string, updateData: Partial<IBet>) {
    return await betModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("user");
  }

  public static async deleteBet(id: string) {
    return await betModel.findByIdAndDelete(id);
  }
}

export default BetRepository;
