import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    // console.log(existingUser._id.toString());
    // console.log(req.params.id);
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      const err = createError(404, "Email đã tồn tại");
      res.status(404).json(err);
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).select("-password");
      const err = createError(200, "Cập nhật thành công");
      res.status(200).json(err);
    }
    
    
    // const err = createError(200, "Update thành công");
    // res.status(200).json(err);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User đã được xóa");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const getMembers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $in: ["leader", "employee"] } })
      .select("_id name role")
      .exec();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getLeaders = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $in: ["leader"] } })
      .select("_id name role")
      .exec();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $in: ["employee"] } })
      .select("_id name role")
      .exec();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};


