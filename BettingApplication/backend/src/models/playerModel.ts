import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  role: "Batsman" | "Bowler" | "All-Rounder" | "Wicket-Keeper";
  team: "India" | "Australia";
  odds: number;
}

const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"], required: true },
  team: { type: String, enum: ["India", "Australia"], required: true },
  odds: { type: Number, required: true },
});

export default mongoose.model<IPlayer>("P", PlayerSchema);
