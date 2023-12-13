const Question = require("../models/questionModel");

exports.addQuestions = async (req, res) => {
  try {
    const { question, answer, ...options } = req.body;
    const newQuestion = new Question({
      question,
      answer,
      ...options,
    });
    await newQuestion.save();
    res.status(201).json({ message: "Question Add successfully" });
  } catch (error) {
    res.status(400).json({ error: `Question Add is failed ${error}` });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Question is not present" });
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
    res.status(200).json({error:"Question deleted successfully"})
  } catch (error) {
    res.status(500).json({ error: "Internal server" });
  }
};
