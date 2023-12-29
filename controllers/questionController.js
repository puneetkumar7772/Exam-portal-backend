const Question = require("../models/questionModel");
const Quizze = require("../models/addQuizzeModel");

exports.addQuestions = async (req, res) => {
  try {
    const { question, answer, options, quizID } = req.body;
    console.log("222222222", quizID);
    const quiz = await Quizze.findById(quizID);
    console.log("111111111", quiz);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    const newQuestion = new Question({
      question,
      answer,
      options,
      quiz: quiz._id, // Reference to the quiz
    });
    await newQuestion.save();
    res.status(201).json({ message: "Question Add successfully" });
  } catch (error) {
    res.status(400).json({ error: `Question Add is failed ${error}` });
  }
};

exports.getQuestionsByQuizId = async (req, res) => {
  try {
    const { quizID } = req.params;

    console.log("#########3", quizID);
    const quiz = await Quizze.findById(quizID);
    console.log("@@@@@@@@@", quiz);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    const questions = await Question.find({ quiz: quiz._id });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions" });
  }
};

exports.deleteQuestionById = async (req, res) => {
  try {
    const questionID = req.params.id;
    console.log("65265322", questionID);
    const QuestionId = await Question.findOneAndDelete({ _id: questionID });
    if (!QuestionId) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ error: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server" });
  }
};
