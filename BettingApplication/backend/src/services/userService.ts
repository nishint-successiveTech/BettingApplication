import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository";
import { IUser } from "../interfaces/IUser";

class UserService {
  //(Register)
  public static async createUser(userData: IUser) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    return await UserRepository.createUser(userData);
  }

  //Login User
  public static async loginUser(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    return { token, user };
  }
}

export default UserService;
