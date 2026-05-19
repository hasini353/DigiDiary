const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
  class: String,
  section: String,
  subject: String,
  date: String,
  text: String,
  teacher: String,
  school: String,
  schoolAddress: String
});

module.exports = mongoose.model("Homework", homeworkSchema);
