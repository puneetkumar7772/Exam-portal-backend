const jwt = require("jsonwebtoken");
require('dotenv').config();
const User  = require("../models/registerModel");

const secretKey = process.env.JWT_SECRET_KEY;
console.log(secretKey,"fghjkl;")

const authMiddleware = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer")) {
      return res.status(400).json({ message: "Invalid token or token format is wrong" });
    }

    const token = authToken.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    console.log("11111111",decodedToken.id)
    req.user = await User.findById({_id:decodedToken.id});

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};


const isAdmin = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer")) {
      return res.status(400).json({ message: "Invalid token or token format is wrong" });
    }

    const token = authToken.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    console.log("11111111",decodedToken.id)
    req.user = await User.findById({_id:decodedToken.id});

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;
