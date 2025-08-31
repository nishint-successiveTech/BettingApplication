import ConfirmBetRepository from "../repositories/confirmBetRepo";

class ConfirmBetService {
  public static async confirmCreateBet(data: any) {
    console.log("---------------");
    return await ConfirmBetRepository.confirmCreateBet(data);
  }
  public static async winnerDeclare(data: any) {
    console.log("---------------");
    return await ConfirmBetRepository.winnerDeclare(data);
  }
}

export default ConfirmBetService;
