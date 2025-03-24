import mongoose from "mongoose";
import { User } from "../ models/user.model.js";
import bcrypt from "bcrypt";
import { generatetoken } from "../utils/generateToken.js";
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
