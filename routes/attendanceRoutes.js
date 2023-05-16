const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/", attendanceController.createNewAttendance);

router.get("/", attendanceController.getAttendanceById);

router.put("/", attendanceController.updateAttendance);

router.delete("/", attendanceController.deleteAttendance)

module.exports = router;
