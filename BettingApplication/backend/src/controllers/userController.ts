import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  public static async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await UserService.loginUser(email, password);
      res.status(200).json({ token, user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public static async getUserMoneyByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const money = await UserService.getUserMoneyByEmail(email);

      if (money === null) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res.json({ success: true, money });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  static async deposit(req: Request, res: Response) {
    try {
      const { email, amount } = req.body;
      const user = await UserService.deposit(email, Number(amount));
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async withdraw(req: Request, res: Response) {
    try {
      const { email, amount } = req.body;
      const user = await UserService.withdraw(email, Number(amount));
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default UserController;
