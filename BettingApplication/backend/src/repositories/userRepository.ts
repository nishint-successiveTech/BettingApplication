import { IUser } from "../interfaces/IUser";
import userModel from "../models/userModel";

class UserRepository {
  public static async createUser(userdata: IUser) {

    const newUser = new userModel(userdata);
    return await newUser.save();
  }

  public static async findByEmail(email: string) {
    return await userModel.findOne({ email }).select("+password"); 
  }

  
}

export default UserRepository;
