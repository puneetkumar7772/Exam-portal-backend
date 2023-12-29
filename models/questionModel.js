const mongoose = require("mongoose");
const addQuestion = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      optionOne: {
        type: String,
        required: true,
      },
      optionTwo: {
        type: String,
        required: true,
      },
      optionThree: {
        type: String,
        required: true,
      },
      optionFour: {
        type: String,
        required: true,
      },
    },
  ],
  answer: {
    type: String,
    required: true,
  },

  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quizze',
  },
});

const Question = mongoose.model("Question", addQuestion);

module.exports = Question;
