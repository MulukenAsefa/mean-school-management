const Attendance = require('../models/attendance.model');

// @desc    Mark or update attendance for students
// @route   POST /api/attendance
// @access  Private/Teacher
exports.markAttendance = async (req, res) => {
  const { records } = req.body; // records is an array of { studentId, date, status }
  const teacherId = req.user._id;

  try {
    const operations = records.map(record => ({
      updateOne: {
        filter: { student: record.studentId, date: new Date(record.date) },
        update: { 
          $set: { 
            status: record.status,
            markedBy: teacherId
          }
        },
        upsert: true // This will create a new document if one doesn't exist
      }
    }));
    
    await Attendance.bulkWrite(operations);
    res.status(201).json({ message: 'Attendance marked successfully' });

  } catch (error) {
    res.status(400).json({ message: 'Failed to mark attendance', error: error.message });
  }
};

// @desc    Get attendance for the logged-in student
// @route   GET /api/attendance/my
// @access  Private/Student
exports.getMyAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ student: req.user._id })
      .sort({ date: -1 }); // Sort by most recent date
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get attendance for a teacher's students for a specific date
// @route   GET /api/attendance/students/:date
// @access  Private/Teacher
exports.getStudentAttendanceByDate = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ 
      markedBy: req.user._id, 
      date: new Date(req.params.date) 
    }).populate('student', 'name');
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
