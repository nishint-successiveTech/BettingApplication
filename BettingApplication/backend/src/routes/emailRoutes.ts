import { Router } from "express";
import EmailController from "../controllers/emailController"; // adjust path

class EmailRoutes {
  public static allroutes() {
    const router = Router();

    // ✅ Send a welcome email
    router.post("/sendEmail", EmailController.sendWelcomeEmail);

    return router;
  }
}

export default EmailRoutes;
