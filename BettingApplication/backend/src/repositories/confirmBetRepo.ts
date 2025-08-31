import BetModel from "../models/betModel";
import confirmBetModel from "../models/confirmBet";
import userModel from "../models/userModel";
interface Winner {
  matchId: {
    type: String;
    required: true;
  };
  teamId: {
    type: String;
    required: true;
  };
}

class ConfirmBetRepository {
  public static async confirmCreateBet(data: any) {
    //console.log(data);
    return await confirmBetModel.create(data);
  }
  public static async winnerDeclare(data: Winner) {
    const matchBets = await confirmBetModel.find({ matchId: data.matchId });

    const winningBets = matchBets.filter((bet) => bet.teamId === data.teamId);

    console.log(winningBets)

    for(let obj2 of winningBets){
        const userByEmail=await userModel.findOne({email:obj2.userEmail});

        if (!userByEmail) {
      console.warn(`No user found with email: ${obj2.userEmail}`);
      continue; // skip this bet
    }
      
    
        userByEmail.money+=obj2.betAmount*2;
        await userByEmail.save();
    }
    return winningBets;
  }
}
export default ConfirmBetRepository;
