import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  money: {
    type: Number,
    default: 1000, // Optional: default money amount for new users
  },
});

const userModel = mongoose.model("U", userSchema);
export default userModel;

// import mongoose, { Document, Schema, Types } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   phoneNumber: string;
//   password: string;
//   money: number;
//   bets: Types.ObjectId[];
// }

// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String, required: true, unique: true },
//   password: { type: String, required: true, select: false },
//   money: { type: Number, default: 1000 },
//   bets: [{ type: Schema.Types.ObjectId, ref: "Bet" }],
// });

// const UserModel = mongoose.model<IUser>("U", userSchema);
// export default UserModel;
