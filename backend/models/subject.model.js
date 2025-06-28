const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Subject', SubjectSchema);
