// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import UserRepository from "../repositories/userRepository";
// import { IUser } from "../interfaces/IUser";

// class UserService {
//   //(Register)
//   public static async createUser(userData: IUser) {
//     const existingUser = await UserRepository.findByEmail(userData.email);

//     if (existingUser) {
//       throw new Error("User already exists");
//     }

//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     userData.password = hashedPassword;
//     console.log("userData ser", userData);

//     return await UserRepository.createUser(userData);
//   }

//   //Login User
//   public static async loginUser(email: string, password: string) {
//     const user = await UserRepository.findByEmail(email);
//     if (!user) {
//       throw new Error("Invalid email or password");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error("Invalid email or password");
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, "SECRET_KEY", {
//       expiresIn: "1h",
//     });

//     return { token, user };
//   }

//   public static async getUserMoneyByEmail(email: string) {
//     console.log(email);
//     return await UserRepository.getUserMoneyByEmail(email);
//   }

//   static async deposit(email: string, amount: number) {
//     return await UserRepository.depositMoney(email, amount);
//   }

//   static async withdraw(email: string, amount: number) {
//     return await UserRepository.withdrawMoney(email, amount);
//   }
// }

// export default UserService;


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository";
import { IUser } from "../interfaces/IUser";

const JWT_SECRET = process.env["JWT_SECRET"] || "SECRET_KEY";

class UserService {
  // ✅ Register
  public static async createUser(userData: IUser) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    return await UserRepository.createUser(userData);
  }

  // ✅ Login
  public static async loginUser(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const payload = { id: user._id, email: user.email, ...(user.role ? { role: user.role } : {}) };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
  }

  // ✅ Money operations
  public static async getUserMoneyByEmail(email: string) {
    return await UserRepository.getUserMoneyByEmail(email);
  }

  public static async deposit(email: string, amount: number) {
    return await UserRepository.depositMoney(email, amount);
  }

  public static async withdraw(email: string, amount: number) {
    return await UserRepository.withdrawMoney(email, amount);
  }
}

export default UserService;

