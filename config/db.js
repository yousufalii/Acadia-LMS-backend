const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://yousuf:gamepal@cluster0.rwyn8we.mongodb.net/lms",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
