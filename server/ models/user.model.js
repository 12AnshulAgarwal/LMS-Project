import mongoose, { Schema, Types } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },

    enrolledCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "course",
      },
    ],
    photourl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
