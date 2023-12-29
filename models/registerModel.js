const mongoose = require("mongoose");

const registerUser = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    required: true,
  },
  cochingName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", registerUser);

module.exports = User;
