const User = require("../models/registerModel");

exports.registerUser = async (req, res) => {
  try {
    const { password, email, userName, confirmedPassword, ...userdata } =
      req.body;

    const data = await User.findOne({ email });
    if (data) {
      return res.status(400).json({ error: "Duplicate Email is not allowed" });
    }
    if (password !== confirmedPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const newUser = new User({
      password,
      email,
      confirmedPassword,
      userName,
      ...userdata,
    });
    await newUser.save();

    res.status(201).json({ message: "User Register successfully" });
  } catch (error) {
    res.status(400).json({ error: `User Registration is failed ${error}` });
  }
};
