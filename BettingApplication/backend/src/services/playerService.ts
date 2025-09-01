import PlayerRepository from "../repositories/playerRepo";

class PlayerService {
  public static async getAllPlayers() {
    return await PlayerRepository.getAllPlayers();
  }
}

export default PlayerService;
