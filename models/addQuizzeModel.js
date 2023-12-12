const mongoose = require("mongoose");

const addQuizzeSchema = new mongoose.Schema({
  quizzeTitle: {
    type: String,
    required: true,
  },
  quizzeDescription: {
    type: String,
    required: true,
  },
  maxMark: {
    type: Number,
    required: true,
  },
  numberOfQuestion: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Quizze = mongoose.model("Quizze", addQuizzeSchema);

module.exports = Quizze;
