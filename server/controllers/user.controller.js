import mongoose from "mongoose";
import { User } from "../ models/user.model.js";
import bcrypt from "bcrypt";
import { generatetoken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        Success: false,
        message: "All fileds are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        Success: false,
        message: "User Already Exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      Success: true,
      message: "Account created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        Success: false,
        message: "all fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        Success: false,
        message: "invalid email or password",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({
        Success: false,
        message: "invalid email or password",
      });
    }
    generatetoken(res, user, `Welcome back ${user.name}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Success: false,
      message: "Failed to login",
    });
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
      Success: true,
      message: "Logout Successfully",
    });
  } catch (err) {
    return res.status(404).json({
      Success: false,
      message: "Logout failed",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        Success: false,
      });
    }
    return res.status(200).json({
      Success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to load user",
      Success: false,
    });
  }
};
export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    //extracts public id from the url of the old image if it exists
    if (user.photourl) {
      const publicid = user.photourl.split("/").pop().split(".")[0]; //extract public id
      deleteMediaFromCloudinary(publicid);
    }

    //upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const UpdatedUrl = cloudResponse.secure_url;

    const updatedData = { name, photourl: UpdatedUrl }; // ✅ correct key
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "User Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
