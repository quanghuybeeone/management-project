import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "avatar.png",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "leader", "employee"],
      default: "employee",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);