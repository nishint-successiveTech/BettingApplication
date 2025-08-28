import { IBet } from "../models/betModel";
import betModel from "../models/betModel";

class BetRepository {
  // CREATE: Create a new bet
  public static async createBet(betData: Partial<IBet>) {
    const bet = new betModel(betData);
    return await bet.save();
  }

  // READ: Get bet by ID
  public static async findById(id: string) {
    return await betModel.findById(id).populate("user");
  }

  // READ: Get all bets
  public static async getAllBets() {
    return await betModel.find().populate("user");
  }

  // READ: Get bets by user ID
  public static async getBetsByUserId(userId: string) {
    return await betModel.find({ user: userId }).populate("user");
  }

  // UPDATE: Update bet status or other fields
  public static async updateBet(id: string, updateData: Partial<IBet>) {
    return await betModel.findByIdAndUpdate(id, updateData, { new: true }).populate("user");
  }

  // DELETE: Remove a bet
  public static async deleteBet(id: string) {
    return await betModel.findByIdAndDelete(id);
  }
}

export default BetRepository;
