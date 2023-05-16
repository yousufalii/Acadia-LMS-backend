const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ studentId: student._id }, "JWT_SECRET", {
      expiresIn: "1d",
    });
    res.json({ token, studentId: student._id, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const studentLogout = (req, res) => {
  try {
    res.clearCookie('token'); 
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { studentLogin, studentLogout };
