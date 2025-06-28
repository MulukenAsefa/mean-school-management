const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  name: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Grade', GradeSchema);
