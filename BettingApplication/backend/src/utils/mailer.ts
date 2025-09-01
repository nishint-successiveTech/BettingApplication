import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env["EMAIL_USER"],
        pass: process.env["EMAIL_PASS"],
      },
    });
  }

  async sendWelcomeEmail(to: string, name?: string): Promise<void> {
    const mailOptions = {
      from: `"Betting Bazzi" <${process.env["EMAIL_USER"]}>`,
      to,
      subject: "Welcome to Betting Bazzi!",
      html: `<h1>Welcome ${name || ""}!</h1>
             <p>Thank you for joining Betting Bazzi. We're excited to have you on board!</p>
             <p> Congrats you get 1000 Rs as registration bonus`,
             
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${to}`);
    } catch (err) {
      console.error("Failed to send welcome email:", err);
    }
  }
}

export default EmailService;
