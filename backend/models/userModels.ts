import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
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

    // uid: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
