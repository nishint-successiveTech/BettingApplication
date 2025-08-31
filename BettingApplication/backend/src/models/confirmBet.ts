import mongoose from "mongoose";

const confirmBetSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  betAmount: {
    type: Number,
    required: true,
  },
});

const confirmBetModel = mongoose.model("confirmBetModel", confirmBetSchema);
export default confirmBetModel;
