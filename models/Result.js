const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    result: [
      {
        studentId: {
          type: String,
        },
        marks: {
          type: Number,
          default: 0,
        },
        grade: {
          type: String,
          default: "F",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);

