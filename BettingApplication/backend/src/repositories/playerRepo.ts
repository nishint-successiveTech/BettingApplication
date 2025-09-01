import playerModel, { IPlayer } from "../models/playerModel";

class PlayerRepository {
  public static async getAllPlayers(): Promise<IPlayer[]> {
    return await playerModel.find();
  }
}

export default PlayerRepository;
