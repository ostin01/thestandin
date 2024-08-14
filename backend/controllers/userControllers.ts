import { Request, Response } from "express";
import { User } from "../models/userModels";
import bcrypt from "bcryptjs";
import generateToken from "../lib/generateToken";

export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      generateToken(user._id as unknown as string, res);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        password: user.password,
      });
    } else {
      return res.status(400).json({ mssg: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
  }
}
