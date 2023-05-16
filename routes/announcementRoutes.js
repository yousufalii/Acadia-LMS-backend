const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");

router.post("/", announcementController.createNewAnnouncement);

router.get("/", announcementController.getAnnouncement);

router.put("/", announcementController.updateAnnouncement);

router.delete("/", announcementController.deleteAnnouncement)

module.exports = router;
