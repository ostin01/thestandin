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
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password as string
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ message: "Invalid login credentials" });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as unknown as string, res),
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
