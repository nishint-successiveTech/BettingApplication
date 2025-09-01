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



// import { Router } from "express";
// import UserController from "../controllers/userController";
// import AuthMiddleware from "../middleware/authMiddleware";

// class UserRoutes {
//   public static allroutes() {
//     const router = Router();

//     // Public routes
//     router.post("/createUser", UserController.createUser);
//     router.post("/loginUser", UserController.loginUser);

//     // Protected routes (user must be authenticated)
//     router.get(
//       "/getMoney/:email",
//       AuthMiddleware.authenticate,
//       UserController.getUserMoneyByEmail
//     );

//     router.post(
//       "/deposit",
//       AuthMiddleware.authenticate,
//       UserController.deposit
//     );

//     router.post(
//       "/withdraw",
//       AuthMiddleware.authenticate,
//       UserController.withdraw
//     );

//     // Example: Role-based route (optional, e.g., admin-only)
//     // router.post(
//     //   "/admin/deposit",
//     //   AuthMiddleware.authenticate,
//     //   AuthMiddleware.authorize(["admin"]),
//     //   UserController.deposit
//     // );

//     return router;
//   }
// }

// export default UserRoutes;

