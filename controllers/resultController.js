const Result = require("../models/Result");

const createNewResult = async (req, res) => {
  const { courseId, courseName, result } = req.body;

  const newResult = new Result({
    courseId,
    courseName,
    result,
  });

  try {
    await newResult.save();
    res.status(201).json({ message: "Result uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading result." });
  }
};

const getResultByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const results = await Result.find({ "result.studentId": studentId });

    const filteredResults = results.map((record) => ({
      courseId: record.courseId,
      courseName: record.courseName,
      result: record.result.filter((grade) => grade.studentId === studentId),
    }));

    res.json(filteredResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Grades not found." });
  }
};

const updateResultByStudentId = async (req, res) => {
  try {
    const { courseId, studentId, marks, grade } = req.body;

    const result = await Result.findOneAndUpdate(
      { courseId, "result.studentId": studentId },
      { $set: { "result.$.marks": marks, "result.$.grade": grade } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json({ message: "Result updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const deleteResultByStudentId = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const result = await Result.findOne({
      courseId,
      "result.studentId": studentId,
    });
    if (!result) {
      return res.status(404).json({ message: "Result not found." });
    }
    await Result.deleteOne(result);
    res.status(200).json({ message: "Result deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Server error." });
  }
};

module.exports = {
  createNewResult,
  getResultByStudentId,
  updateResultByStudentId,
  deleteResultByStudentId,
};
