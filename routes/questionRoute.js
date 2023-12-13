const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

router.post("/addQuestion", questionController.addQuestions);
router.get("/getQuestion", questionController.getQuestion);
router.delete("/deleteQuestion/:id", questionController.deleteQuestionById);



module.exports = router;
