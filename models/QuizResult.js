const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizResultSchema = new Schema({
  quizId: Number,
  studentId: String,
  score: Number,
  date: Date,
});

module.exports = mongoose.model("QuizResult", quizResultSchema);

