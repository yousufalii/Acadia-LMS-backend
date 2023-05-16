const Attendance = require("../models/Attendance");

const createNewAttendance = async (req, res) => {
  const { courseId, courseName, absents } = req.body;
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { courseId },
      { $push: { absents } },
      { upsert: true }
    );
    if (attendance) {
      res
        .status(200)
        .json({ message: "Attendance record updated successfully" });
    } else {
      const newAttendance = new Attendance({
        courseId,
        courseName,
        absents,
      });
      await newAttendance.save();
      res.status(201).json({ message: "Attendance recorded successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error recording attendance" });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Attendance not found." });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { courseId, studentId, absents } = req.body;
    const attendance = await Attendance.findOne(
      { courseId, absents: { $elemMatch: { studentId } } },
      { "absents.$": 1 }
    );
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    await Attendance.updateOne(
      { _id: attendance._id, "absents.studentId": studentId },
      { $set: { "absents.$.absents": absents } }
    );
    return res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const attendance = await Attendance.findOne({ courseId });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    const studentIndex = attendance.absents.findIndex(
      (absent) => absent.studentId === studentId
    );
    if (studentIndex === -1) {
      return res
        .status(404)
        .json({ message: "Attendance record not found for student" });
    }
    attendance.absents.splice(studentIndex, 1);
    await attendance.save();
    return res.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createNewAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
