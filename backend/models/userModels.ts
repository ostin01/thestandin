import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: {
      type: String,
      require: [true, "please add an Email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "please add a password"],
      minLength: 6,
    },
    bio: { type: String },
    gender: { type: String },
    role: { type: String },
    profilePhoto: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
