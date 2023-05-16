const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const assignmentRoutes = require("./routes/assignmentRoutes");
const quizRoutes = require("./routes/quizRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const resultRoutes = require("./routes/resultRoutes");

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/announcement", announcementRoutes)
app.use("/assignment", assignmentRoutes);
app.use("/quiz", quizRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/result", resultRoutes);
app.use("/logout", loginRoutes)



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
