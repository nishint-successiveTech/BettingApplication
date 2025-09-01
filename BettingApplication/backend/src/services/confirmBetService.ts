import ConfirmBetRepository from "../repositories/confirmBetRepo";

class ConfirmBetService {
  public static async confirmCreateBet(data: any) {
    return await ConfirmBetRepository.confirmCreateBet(data);
  }
  public static async winnerDeclare(data: any) {
    return await ConfirmBetRepository.winnerDeclare(data);
  }
}

export default ConfirmBetService;
