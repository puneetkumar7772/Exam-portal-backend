const express = require('express');
const QuizzeController = require('../controllers/addQuizzes');
const router = express.Router();

router.post('/addQuizze', QuizzeController.addQuizze);
router.get('/getQuizze', QuizzeController.getQuizzes);
router.get('/getQuizze/:category', QuizzeController.quizzeByCategory);
router.get('/deleteQuiz/:id', QuizzeController.deleteQuiz);
router.get('/getQuizById/:id', QuizzeController.quizzById);
router.put('/update/:id', QuizzeController.updateData);



module.exports = router;