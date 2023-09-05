const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  name: String,
  user_id: String, // Reference to the User model
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] // Reference to Question model
});

module.exports = mongoose.model('Survey', SurveySchema);
