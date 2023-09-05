const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  type: String,
  question: String,
  options: [String],
  survey_id: String
});

module.exports = mongoose.model('Question', QuestionSchema);
