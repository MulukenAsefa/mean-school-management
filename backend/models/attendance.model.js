const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  date: { 
    type: Date,
    required: true
  },
  status: { 
    type: String, 
    enum: ['Present', 'Absent', 'Late'], 
    required: true 
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create a compound index to ensure a student can only have one status per day.
AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
