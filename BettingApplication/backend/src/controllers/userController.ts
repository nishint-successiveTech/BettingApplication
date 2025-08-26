import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
    // ✅ Create User
    public static async createUser(req: Request, res: Response) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    
    // ✅ Login User
     public static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await UserService.loginUser(email, password);
      res.status(200).json({ token, user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default UserController;
