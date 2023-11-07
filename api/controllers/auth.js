import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(user){
      const err = createError(404, 'Tài khoản đã tồn tại');
      res.status(404).json(err);
    }

    const email = await User.findOne({email: req.body.email})
    if(email){
      const err = createError(404, 'Email đã tồn tại');
      res.status(404).json(err);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    const err = createError(200, 'Đăng ký thành công');
    res.status(200).json(err);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // if (!user) return next(createError(404, "Không tồn tại username"));
    if(!user){
      const err = createError(404, 'Không tồn tại username');
      res.status(404).json(err);
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // if (!isPasswordCorrect) return next(createError(400, "Sai mật khẩu"));
    if(!isPasswordCorrect){
      const err = createError(404, 'Sai mật khẩu');
      res.status(404).json(err);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT
    );

    const { password, role, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      // .json({ ...otherDetails });
      .json({ "access_token": token });
  } catch (err) {
    next(err);
  }
};

export const changepassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    console.log(id);
    console.log(req.body);
    // Tìm kiếm người dùng
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      const err = createError(404, 'Người dùng không tồn tại');
      return res.status(404).json(err);
    }

    // Kiểm tra mật khẩu cũ
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      const err = createError(400, 'Mật khẩu cũ không chính xác');
      return res.status(400).json(err);
    }

    // Mã hóa mật khẩu mới
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    // Cập nhật mật khẩu mới cho người dùng
    user.password = hash;
    await user.save();

    // Trả về thông báo thành công
    const successMessage = createError(200, 'Thay đổi mật khẩu thành công');
    res.status(200).json(successMessage);
  } catch (err) {
    next(err);
  }
};