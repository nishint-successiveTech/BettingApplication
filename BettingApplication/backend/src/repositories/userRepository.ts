import { IUser } from "../interfaces/IUser";
import userModel from "../models/userModel";

class UserRepository {
  // CREATE: New user with default money 1000
  public static async createUser(userdata: IUser) {
    // Ensure money is set to 1000 if not provided
    if (!userdata.money) {
      userdata.money = 1000;
    }
    const newUser = new userModel(userdata);
    return await newUser.save();
  }

  // READ: Find user by email
  public static async findByEmail(email: string) {
    return await userModel.findOne({ email }).select("+password");
  }

  // READ: Find user by ID
  public static async findById(id: string) {
    return await userModel.findById(id);
  }

  // READ: Get all users
  public static async getAllUsers() {
    return await userModel.find();
  }

  public static async getUserMoneyByEmail(email: string) {
    const user = await userModel.findOne({ email }).select("money");
    return user ? user.money : null;
  }

  public static async depositMoney(email: string, amount: number) {
  // 1️⃣ Find the user
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  // 2️⃣ Update money
  user.money += amount;

  // 3️⃣ Save updated user
  await user.save();

  // 4️⃣ Return full user object
  return user;
}

  public static async withdrawMoney(email: string, amount: number) {
    const user = await userModel.findOne({ email });
    if (!user) return null;
    if (user.money < amount) throw new Error("Insufficient balance");
    user.money -= amount;
    await user.save();
    return user;
  }
}

export default UserRepository;

// import { IUser } from "../interfaces/IUser";
// import userModel from "../models/userModel";
// import { IBet } from "../models/betModel";
// import betModel from "../models/betModel";

// class UserRepository {
//   // CREATE: New user with default money 1000
//   public static async createUser(userdata: IUser) {
//     if (!userdata.money) userdata.money = 1000;
//     const newUser = new userModel(userdata);
//     return await newUser.save();
//   }

//   // READ: Find user by email
//   public static async findByEmail(email: string) {
//     return await userModel.findOne({ email }).select("+password").populate("bets");
//   }

//   // READ: Find user by ID
//   public static async findById(id: string) {
//     return await userModel.findById(id).populate("bets");
//   }

//   // READ: Get all users
//   public static async getAllUsers() {
//     return await userModel.find().populate("bets");
//   }

//   public static async getUserMoneyByEmail(email: string) {
//     const user = await userModel.findOne({ email }).select("money");
//     return user ? user.money : null;
//   }

//   public static async depositMoney(email: string, amount: number) {
//     const user = await userModel.findOne({ email });
//     if (!user) throw new Error("User not found");
//     user.money += amount;
//     await user.save();
//     return user;
//   }

//   public static async withdrawMoney(email: string, amount: number) {
//     const user = await userModel.findOne({ email });
//     if (!user) return null;
//     if (user.money < amount) throw new Error("Insufficient balance");
//     user.money -= amount;
//     await user.save();
//     return user;
//   }

//   // ✅ Add a bet for a user
//   public static async addBetToUser(email: string, betData: Partial<IBet>) {
//     const user = await userModel.findOne({ email });
//     if (!user) throw new Error("User not found");

//     // Create new bet
//     const bet = new betModel({ ...betData, user: user._id });
//     await bet.save();

//     // Add bet reference to user's bets array
//     user.bets.push(bet._id);
//     await user.save();

//     return bet;
//   }

//   // ✅ Get all bets of a user
//   public static async getUserBets(email: string) {
//     const user = await userModel.findOne({ email }).populate("bets");
//     if (!user) throw new Error("User not found");
//     return user.bets as IBet[];
//   }
// }

// export default UserRepository;

