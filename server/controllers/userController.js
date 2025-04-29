const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "gsdgengnntneazfehhtht";
const moment = require("moment");
const sentOtpEmail = require("../utils/otpMail");

exports.signup = async (req, res) => {
  try {
    const { name, email, age, phone, password , role } = req.body;

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new userModel({
      name,
      email,
      age,
      phone,
      password: hash,
      role
    });

    const userData = new userModel(user);
    const data = await userData.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.status !== "active") {
      return res.status(400).json({ message: "User is inactive" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const currTime = moment(); // current moment
    const newTime = currTime.clone().add(10, "minutes");

    await userModel.findOneAndUpdate({ email }, { otp, otpTimer: newTime });

    await sentOtpEmail("m.ayyynkpanwar7@gmail.com", otp, user.name);

    res.status(200).json({
      message: "OTP sent to your email. Please verify.",
      step: "otp_verification",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    const currTime = moment(); // current moment

    if (currTime > user.otpTimer) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please login again." });
    }

    if (toString(otp) !== toString(user.otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await userModel.findOneAndUpdate({ email }, { otp: "", otpTimer: "" });

    // Generate JWT
    const token = jwt.sign({ email: user.email, id: user._id }, secretKey, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "OTP verified successfully", token, user });
  } catch (error) {
    console.log("hyy");
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const currTime = moment(); // current moment
    const newTime = currTime.clone().add(10, "minutes");

    await userModel.findOneAndUpdate({ email }, { otp, otpTimer: newTime });

    await sentOtpEmail("m.ayyynkpanwar7@gmail.com", otp, user.name);

    res.status(200).json({
      message: "OTP sent to your email. Please verify.",
      step: "otp_verification",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.newPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
      }
      
      console.log(otp , user.otp)

    if (toString(user.otp) !== toString(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const currTime = moment(); // current moment

    if (user.otpTimer < currTime) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { password: hash, otp: "", otpTimer: "" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "Failed to update password" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
