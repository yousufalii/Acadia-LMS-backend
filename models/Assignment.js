const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submittedAssignmentSchema = new Schema({
  assignmentId: Number,
  studentId: String,
  file: {
    filename: String,
    contentType: String,
    data: Buffer
  },
  date: {
    type: Date,
    default: Date.now
  },
});


const assignmentSchema = new Schema({
  assignmentId: Number,
  courseName: String,
  details: String,
  date: {
    type: Date,
    default: Date.now
  },
  submittedAssignmentsByStudentId: [submittedAssignmentSchema],
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
