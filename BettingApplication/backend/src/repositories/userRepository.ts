import { IUser } from "../interfaces/IUser";
import userModel from "../models/userModel";

class UserRepository {
  public static async createUser(userdata: IUser) {
    if (!userdata.money) {
      userdata.money = 1000;
    }
    const newUser = new userModel(userdata);
    return await newUser.save();
  }

  public static async findByEmail(email: string) {
    return await userModel.findOne({ email }).select("+password");
  }

  public static async findById(id: string) {
    return await userModel.findById(id);
  }

  public static async getAllUsers() {
    return await userModel.find();
  }

  public static async getUserMoneyByEmail(email: string) {
    const user = await userModel.findOne({ email }).select("money");
    return user ? user.money : null;
  }

  public static async depositMoney(email: string, amount: number) {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");

    user.money += amount;

    await user.save();

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
