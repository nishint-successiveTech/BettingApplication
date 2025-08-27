// models/matchModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICricketMatch extends Document {
  id: string;
  dateTimeGMT: Date;
  matchType: string;
  status: string;
  ms: string;
  t1: string;
  t2: string;
  t1s?: string;
  t2s?: string;
  t1img?: string;
  t2img?: string;
  series: string;
}

const MatchSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  dateTimeGMT: { type: Date, required: true },
  matchType: { type: String, required: true },
  status: { type: String, required: true },
  ms: { type: String, required: true },
  t1: { type: String, required: true },
  t2: { type: String, required: true },
  t1s: { type: String, default: "" },
  t2s: { type: String, default: "" },
  t1img: { type: String, default: "" },
  t2img: { type: String, default: "" },
  series: { type: String, required: true },
});

// ✅ Store in a variable
const CricketMatchModel = mongoose.model<ICricketMatch>("CricketMatch", MatchSchema);

// ✅ Export the variable
export default CricketMatchModel;
