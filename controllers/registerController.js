const User = require("../models/registerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.registerUser = async (req, res) => {
  try {
    const { password, email, userName, confirmedPassword, ...userdata } =
      req.body;


      const data = await User.findOne({ email });
      // if(data.email === process.env.ADMIN1_EMAIL){
        
      // }

      // if(email === process.env.ADMIN1_EMAIL && password === process.env.ADMIN1_PASSWORD){
      //   const admin = new User({
      //     password, email, userName, confirmedPassword,role:"ADMIN",...userdata
      //   })
      //   await admin.save()
      //   return res.status(201).json({message:"ADMIN register successfully"})
      // }

    if (data) {
      return res.status(400).json({ error: "Duplicate Email is not allowed" });
    }
    if (password !== confirmedPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      password: hashPassword,
      email,
      userName,
      ...userdata,
    });
    await newUser.save();

    res.status(201).json({ message: "User Register successfully" });
  } catch (error) {
    res.status(400).json({ error: `User Registration is failed ${error}` });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("7777777", email);
    console.log("888888888", password);
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ error: "Incorrect Email and Password" });
    }
    const pass = await bcrypt.compare(password, existUser.password);
    console.log("!!!!!!!", pass);
    if (!pass) {
      return res.status(404).json({ error: "Incorrect Email and Password" });
    }
    const authToken = await jwt.sign(
      { id: existUser.id},
      process.env.JWT_SECRET_KEY
    );
    console.log("#########", authToken);
    return res.status(200).json({
      success: "Login successfully",
      token: authToken,
      user:existUser
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: "User is not present" });
  }
};

exports.getSingleUser = async(req,res)=>{
  const {id} = req.params;

  const user = req.user;

  console.log(user.fullName)

  return res.json({user})
}

exports.deleteUserById = async (req, res) => {
  try {
    const userID = req.params.id;
    console.log("id-----------------", userID);
    const deleteUser = await User.findOneAndDelete({ _id: userID });
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json("User is deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
