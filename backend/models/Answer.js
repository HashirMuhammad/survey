const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  answer: String,
  question_id: String,
  survey_id: String,
  client_id: String
});

module.exports = mongoose.model('Answer', AnswerSchema);
