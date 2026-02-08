import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModels";

export default async function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized , no Token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload & { user_id: string };
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized , invalid Token" });
    }
    const id = decoded.id;

    const user = await User.findById(id).select("password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    (req as any).user = user.id;

    next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
