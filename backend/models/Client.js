const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  survey_id: String
});

module.exports = mongoose.model('Client', ClientSchema);
