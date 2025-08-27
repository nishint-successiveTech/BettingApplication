// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false,
//   },
  
// });

// const userModel = mongoose.model("U", userSchema);
// export default userModel;

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

