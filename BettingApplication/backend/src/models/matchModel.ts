import mongoose, { Schema, Document } from "mongoose";

export interface IMatch extends Document {
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  status: string;
  startTime: Date;
}

const MatchSchema: Schema = new Schema({
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  scoreA: { type: Number, default: 0 },
  scoreB: { type: Number, default: 0 },
  status: { type: String, required: true },
  startTime: { type: Date, required: true },
});

export default mongoose.model<IMatch>("M", MatchSchema);
