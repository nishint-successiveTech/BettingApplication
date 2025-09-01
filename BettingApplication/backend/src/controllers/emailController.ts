import { Request, Response } from "express";
import EmailService from "../utils/mailer";

class EmailController {
  private static emailService = new EmailService(); // ✅ static property

  public static async sendWelcomeEmail(req: Request, res: Response) {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      await EmailController.emailService.sendWelcomeEmail(email, name); // ✅ access via class name
      return res.status(200).json({ message: `Welcome email sent to ${email}` });
    } catch (err) {
      console.error("Error sending welcome email:", err);
      return res.status(500).json({ error: "Failed to send welcome email" });
    }
  }
}

export default EmailController;
