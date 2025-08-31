import { Router } from "express";
import UserController from "../controllers/userController";
class UserRoutes {
  public static allroutes() {
    const router = Router();

    router.post("/createUser", UserController.createUser);

    router.post("/loginUser", UserController.loginUser);

    router.get("/getMoney/:email", UserController.getUserMoneyByEmail);

    router.post("/deposit", UserController.deposit);

    router.post("/withdraw", UserController.withdraw);

    return router;
  }
}

export default UserRoutes;

// import { Router } from "express";
// import UserController from "../controllers/userController";
// import AuthService from "../middleware/authMiddleware";

// class UserRoutes {
//   public static allroutes() {
//     const router = Router();

//     // 🔓 Public routes
//     router.post("/createUser", UserController.createUser);
//     router.post("/loginUser", UserController.loginUser);

//     // 🔐 Protected routes
//     router.get(
//       "/getMoney/:email",
//       AuthService.authenticate,
//       UserController.getUserMoneyByEmail
//     );

//     router.post("/deposit", AuthService.authenticate, UserController.deposit);

//     router.post("/withdraw", AuthService.authenticate, UserController.withdraw);

//     return router;
//   }
// }

// export default UserRoutes;
