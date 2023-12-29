const Quizze = require("../models/addQuizzeModel");

exports.addQuizze = async (req, res) => {
  try {
    const {
      quizzeTitle,
      quizzeDescription,
      maxMark,
      numberOfQuestion,
      category,
      status,
    } = req.body;
    const data = await Quizze.findOne({ quizzeTitle });
    if (data) {
      return res.status(400).json({ error: "Duplicate quiz is not allowed" });
    }
    const newQuizze = new Quizze({
      quizzeTitle,
      quizzeDescription,
      maxMark,
      numberOfQuestion,
      category,
      status,
    });
    await newQuizze.save();

    res.status(201).json({ message: "Quizze Add successfully" });
  } catch (error) {
    res.status(400).json({ error: `Quizze Add is failed ${error}` });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const Quizzes = await Quizze.find();
    res.status(200).json(Quizzes);
  } catch (error) {
    res.status(500).json({ error: "Quizze is not present" });
  }
};

exports.quizzeByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    console.log("========", categoryName);
    const findQuizzes = await Quizze.find({ category: categoryName });
    console.log("+++++++", findQuizzes);
    res.status(200).json({ data: findQuizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quizID = req.params.id;
    console.log("%%%%%%%%%", quizID);
    const deleteQuiz = await Quizze.findOneAndDelete({ _id: quizID });
    if (!deleteQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json("Quiz is deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal server" });
  }
};

exports.quizzById = async (req, res) => {
  try {
    const quizID = req.params.id;
    console.log("Quiz ID:", quizID);
    const quizzById = await Quizze.findById(quizID);
    if (!quizzById) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json({ success: true, data: quizzById });
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await Quizze.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
