const Announcement = require("../models/Announcement");

const createNewAnnouncement = async (req, res) => {
  try {
    const { details, date } = req.body;
    let announcement = await Announcement.findOne();
    if (announcement) {
      announcement.details = details;
      announcement.date = date;
      res.json({ message: "Announcement updated successfully" });
    } else {
      announcement = new Announcement({ details, date });
      res.status(201).json({ message: "Announcement created successfully" });
    }
    await announcement.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne();
    if (!announcement) {
      return res
        .status(404)
        .json({ message: "Announcement not found. Please create one." });
    }
    return res.json(announcement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { details, date } = req.body;
    const announcement = await Announcement.findOne();
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    announcement.details = details;
    announcement.date = date;
    await announcement.save();
    return res.json({ message: "Announcement updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne();
    if (!announcement) {
      return res.status(404).json({ message: "No announcement found." });
    }
    await Announcement.deleteOne({ _id: announcement._id });
    return res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createNewAnnouncement,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
