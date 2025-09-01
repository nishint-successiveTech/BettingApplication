import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository";
import { IUser } from "../interfaces/IUser";

const JWT_SECRET = process.env["JWT_SECRET"] || "SECRET_KEY";

interface JwtPayload {
  id: string;
  email: string;
  role?: string;
}

class UserService {
  public static async createUser(userData: IUser) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    return await UserRepository.createUser(userData);
  }

  public static async loginUser(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const payload: JwtPayload = {
      id: user._id.toString(),
      email: user.email,
      ...(user.role ? { role: user.role } : {}),
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
  }

  public static async getUserMoneyByEmail(email: string) {
    return await UserRepository.getUserMoneyByEmail(email);
  }

  public static async deposit(email: string, amount: number) {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    return await UserRepository.depositMoney(email, amount);
  }

  public static async withdraw(email: string, amount: number) {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive");
    return await UserRepository.withdrawMoney(email, amount);
  }
}

export default UserService;
