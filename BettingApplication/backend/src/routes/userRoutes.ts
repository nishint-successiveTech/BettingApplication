import { Router } from "express";
import UserController from "../controllers/userController";
class UserRoutes {
  public static allroutes() {
    
    const router = Router();

    router.post("/createUser", UserController.createUser);

     router.post("/loginUser", UserController.loginUser);
    

    return router;
  }
}

export default UserRoutes;
