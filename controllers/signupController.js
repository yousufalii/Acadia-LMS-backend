const Student = require("../models/Student");
const bcrypt = require("bcrypt");

const newStudentSignup = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, studentId } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      studentId,
    });
    await student.save();
    res.status(201).json({ message: "Student created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { newStudentSignup };
