const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", assignmentController.createNewAssignment);

router.get("/", assignmentController.getAllAssignment);

router.post(
  "/:assignmentId/:studentId/submit",
  upload.single("file"),
  assignmentController.submitAssignmentFile
);

router.put(
  "/:assignmentId/:studentId/submit",
  upload.single("file"),
  assignmentController.updateSubmittedAssignment
);

router.delete("/", assignmentController.deleteAssignment);

router.delete(
  "/deletesubmission",
  assignmentController.deleteAssignmentSubmissionByStudentId
);

module.exports = router;
