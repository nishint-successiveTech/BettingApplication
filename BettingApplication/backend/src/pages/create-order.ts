import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env["RAZORPAY_KEY_ID!"],
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { amount } = req.body;
    try {
      const order = await razorpay.orders.create({
        amount: amount * 100, // amount in paise
        currency: "INR",
        receipt: `receipt_${Math.floor(Math.random() * 10000)}`,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: "Failed to create order" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
