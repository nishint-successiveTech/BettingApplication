import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "./userModel";

interface IMatch {
  t1: string;
  t2: string;
  t1img: string;
  t2img: string;
  dateTimeGMT: Date;
}

export interface IBet extends Document {
  user: IUser["_id"];
  matchId: string;
  team: string;
  amount: number;
  status: string;
  date: Date;
  match: IMatch;
}

const matchSchema: Schema = new Schema({
  t1: String,
  t2: String,
  t1img: String,
  t2img: String,
  dateTimeGMT: Date,
});

const betSchema = new Schema<IBet>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  matchId: { type: String, required: true },
  team: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
  match: matchSchema,
});

const BetModel = mongoose.model<IBet>("Bet", betSchema);
export default BetModel;
