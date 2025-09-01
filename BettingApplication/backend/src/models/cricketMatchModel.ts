import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  playerImg?: string;
}

export interface ITeam {
  teamName: string;
  shortname: string;
  img?: string;
  players: IPlayer[];
}

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
  teams: ITeam[];
}

const PlayerSchema = new Schema<IPlayer>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  battingStyle: { type: String, default: "" },
  bowlingStyle: { type: String, default: "" },
  country: { type: String, default: "" },
  playerImg: { type: String, default: "" },
});

const TeamSchema = new Schema<ITeam>({
  teamName: { type: String, required: true },
  shortname: { type: String, required: true },
  img: { type: String, default: "" },
  players: { type: [PlayerSchema], default: [] },
});

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
  teams: { type: [TeamSchema], default: [] },
});

const CricketMatchModel = mongoose.model<ICricketMatch>(
  "CricketMatch",
  MatchSchema
);

export default CricketMatchModel;
