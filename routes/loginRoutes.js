const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/", loginController.studentLogin);

router.delete("/", loginController.studentLogout);

module.exports = router;