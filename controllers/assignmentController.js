const Assignment = require("../models/assignment");

const createNewAssignment = async (req, res) => {
  const { assignmentId, courseName, details } = req.body;
  const assignment = new Assignment({ assignmentId, courseName, details });
  await assignment.save();
  res.status(201).json({ message: "Assignment created successfully" });
};

const getAllAssignment = async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const submitAssignmentFile = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.params;
    const { originalname, buffer } = req.file;

    const assignment = await Assignment.findOne({ assignmentId });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const file = {
      filename: originalname,
      contentType: "application/octet-stream",
      data: buffer,
    };

    assignment.submittedAssignmentsByStudentId.push({
      studentId,
      file,
    });
    await assignment.save();

    return res.json({ message: "Assignment submitted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateSubmittedAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    const { originalname, buffer } = req.file;

    const submittedAssignmentFile = await Assignment.findOne(
      {
        assignmentId,
        "submittedAssignmentsByStudentId.studentId": studentId,
      },
      { "submittedAssignmentsByStudentId.$": 1 }
    );

    if (!submittedAssignmentFile) {
      return res
        .status(404)
        .json({ message: "Submitted assignment file not foound" });
    }
    const updatedFile = {
      filename: originalname,
      contentType: "application/octet-stream",
      data: buffer,
    };

    const updatedAssignmentSubmission = await Assignment.updateOne(
      {
        assignmentId,
        "submittedAssignmentsByStudentId.studentId": studentId,
      },
      {
        $set: {
          "submittedAssignmentsByStudentId.$.file": updatedFile,
        },
      }
    );

    if (updatedAssignmentSubmission.nModified === 0) {
      res
        .status(500)
        .json({ message: "Failed to update submitted assignment." });
    }

    res.status(200).json({ message: "Assignment updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Server error." });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.body;
    const assignment = await Assignment.findOne({ assignmentId });
    if (!assignment) {
      return res
        .status(500)
        .json({ succes: false, message: "Assignment not found." });
    }
    const deletedAssignment = await Assignment.deleteOne({ assignmentId });
    res.status(200).json({ success: true, deletedAssignment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const deleteAssignmentSubmissionByStudentId = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.body;
    const assignment = await Assignment.findOne(
      {
        assignmentId,
        "submittedAssignmentsByStudentId.studentId": studentId,
      },
      {
        "submittedAssignmentsByStudentId.$": 1,
      }
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    await Assignment.updateOne(
      { assignmentId: assignmentId },
      { $pull: { submittedAssignmentsByStudentId: { studentId: studentId } } }
    );
    res.status(200).json({
      message: "Assignment by student id has been successfully deleted.",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Server error." });
  }
};

module.exports = {
  createNewAssignment,
  getAllAssignment,
  submitAssignmentFile,
  updateSubmittedAssignment,
  deleteAssignment,
  deleteAssignmentSubmissionByStudentId,
};
