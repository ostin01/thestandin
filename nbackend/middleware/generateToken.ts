import { Response } from "express";
import jwt from "jsonwebtoken";

export default function generateToken(userId: string, res: Response) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 1000,
    sameSite: "strict",
  });
  return token;
}
