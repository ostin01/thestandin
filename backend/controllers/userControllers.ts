import { Request, Response } from "express";
import { User } from "../models/userModels";
import bcrypt from "bcryptjs";
import generateToken from "../middleware/generateToken";
import admin from "firebase-admin";
export async function signup(req: Request, res: Response) {
  const { firstName = "", lastName = "", email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (user) {
      return res.status(201).json({
        message: "signed up successfully !",
        token: generateToken(user._id.toString(), res),
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
      message: "Logged in successfully !",
      id: user._id,
      token: generateToken(user._id.toString(), res),
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid login credentials" });
  }
}

export async function getLoggedinUser(req: Request, res: Response) {
  try {
    const userId = (req as any).user;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function updateUserProfile(req: Request, res: Response) {
  const storage = admin.storage();
  const { firstName, lastName, bio, gender, role, profilePhoto } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload profile photo to Firebase Storage if provided
    let profilePhotoUrl = user.profilePhoto; // Preserve existing photo if not updated

    if (profilePhoto) {
      const buffer = Buffer.from(profilePhoto, "base64"); // Assuming base64-encoded image
      const fileName = `profile_photos/${userId}_${Date.now()}.jpg`;
      const bucket = storage.bucket(); // Access default bucket

      // Upload file to Firebase Storage
      const file = bucket.file(fileName);
      await file.save(buffer, {
        metadata: {
          contentType: "image/jpeg", // Adjust based on your image type
        },
        public: true, // Make publicly accessible
      });

      // Generate the file's public URL
      profilePhotoUrl = file.publicUrl();
    }

    // Update user profile fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (role) user.role = role;
    user.profilePhoto = profilePhotoUrl;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// export async function updateUserProfile(req: Request, res: Response) {
//   const { firstName, lastName, bio, gender, role, profilePhoto } = req.body;
//   const userId = req.params.id;
//   try {
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (bio) user.bio = bio;
//     if (gender) user.gender = gender;
//     if (role) user.role = role;
//     if (profilePhoto) user.profilePhoto = profilePhoto;

//     const updatedUser = await user.save();

//     res.status(200).json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// }
