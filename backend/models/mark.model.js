const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  marks: Number
});

module.exports = mongoose.model('Mark', MarkSchema);
