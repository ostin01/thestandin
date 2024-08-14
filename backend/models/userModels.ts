import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
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
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
