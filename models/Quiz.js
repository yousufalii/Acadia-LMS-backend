const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  options: [String],
  answer: String,
});

const quizResultSchema = new Schema({
  quizId: Number,
  studentId: String,
  score: Number,
  date: Date,
});

const quizSchema = new Schema({
  quizId: Number,
  courseName: String,
  quizDescription: String,
  questions: [questionSchema],
  quizResultByStudentId: [quizResultSchema],
});

module.exports = mongoose.model("Quiz", quizSchema);
