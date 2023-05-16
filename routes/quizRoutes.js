const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/", quizController.createNewQuiz);

router.get("/", quizController.getAllQuizzes);

router.post(
  "/:studentId/:quizId/submit",
  quizController.submitQuizResultbyStudentId
);

router.get("/:studentId/quizresult", quizController.getQuizResultByStudentId);

router.put("/editquiz", quizController.updateQuizByQuizId);

router.delete("/deletequiz", quizController.deleteQuizByQuizId);

router.put("/udpatequizresult", quizController.updateQuizResultByQuizId);

router.delete("/deletequizresult", quizController.deleteQuizResultByStudentId);

module.exports = router;
