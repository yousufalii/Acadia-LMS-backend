const Quiz = require("../models/Quiz");

const createNewQuiz = async (req, res) => {
  try {
    const { quizId, courseName, quizDescription, questions } = req.body;
    const quiz = new Quiz({
      quizId,
      courseName,
      quizDescription,
      questions,
    });
    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, { quizResultByStudentId: 0 });
    res.status(201).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const submitQuizResultbyStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const quizId = req.params.quizId;

    const quiz = await Quiz.findOne({ quizId });

    const existingResult = quiz.quizResultByStudentId.find(
      (result) => result.studentId === studentId
    );
    if (existingResult) {
      return res.status(400).json({
        message: `Quiz result already submitted for student ID ${studentId}.`,
      });
    }

    quiz.quizResultByStudentId.push({
      studentId: studentId,
      score: req.body.score,
      date: Date.now(),
    });

    await quiz.save();

    res
      .status(201)
      .json({ message: `Quiz result has been submitted successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getQuizResultByStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const studentResult = await Quiz.find(
      {
        quizResultByStudentId: { $elemMatch: { studentId } },
      },
      { quizId: 1, quizResultByStudentId: { $elemMatch: { studentId } } }
    );

    res.status(201).json(studentResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateQuizByQuizId = async (req, res) => {
  try {
    const { quizId, courseName, quizDescription, questions } = req.body;
    const quiz = await Quiz.findOne({ quizId });
    if (!quiz) {
      return res.status(404).josn({ success: false, error: error.message });
    }

    await Quiz.updateOne(
      { quizId },
      { $set: { courseName, quizDescription, questions } }
    );

    res
      .status(201)
      .json({ success: true, message: "Quiz has been updated successfully." });
  } catch (error) {
    res.status(404).json({ succes: false, error: error.message });
  }
};

const deleteQuizByQuizId = async (req, res) => {
  try {
    const { quizId } = req.body;
    const quiz = await Quiz.findOne({ quizId });
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found." });
    }

    await Quiz.deleteOne({ quizId });
    res.status(201).json({ succes: true, message: "Quiz has been deleted." });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateQuizResultByQuizId = async (req, res) => {
  try {
    const { quizId, studentId, score } = req.body;
    const quizScore = Quiz.findOne({
      quizId,
      "updateQuizResultByQuizId.studentId": studentId,
    });
    if (!quizScore) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz score not found." });
    }

    await Quiz.updateOne(
      {
        quizId,
        "quizResultByStudentId.studentId": studentId,
      },
      { $set: { "quizResultByStudentId.$.score": score } }
    );
    res
      .status(201)
      .json({ success: true, message: "Quiz score has been updated." });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const deleteQuizResultByStudentId = async (req, res) => {
  try {
    const { quizId, studentId } = req.body;
    const quizScore = await Quiz.findOne({
      quizId,
      "quizResultByStudentId.studentId": studentId,
    });
    if (!quizScore) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz score not found." });
    }
    await Quiz.updateOne(
      {
        quizId,
        "quizResultByStudentId.studentId": studentId,
      },
      { $pull: { quizResultByStudentId: { studentId } } }
    );

    res.status(201).json({
      success: true,
      message: "Quiz score has been deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNewQuiz,
  submitQuizResultbyStudentId,
  getAllQuizzes,
  getQuizResultByStudentId,
  updateQuizByQuizId,
  deleteQuizByQuizId,
  updateQuizResultByQuizId,
  deleteQuizResultByStudentId,
};
