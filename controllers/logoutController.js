const jwt = require("jsonwebtoken");

const studentLogout = async (req, res) => {
    localStorage.removeItem("token");
    res.status(200).json({ message: "Logout successful" });
};

module.exports = { studentLogout };