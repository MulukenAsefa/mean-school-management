const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getMyAttendance,
  getStudentAttendanceByDate
} = require('../controllers/attendance.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Routes for /api/attendance
router.route('/')
  .post(protect, authorize('Teacher'), markAttendance);

router.route('/my')
  .get(protect, authorize('Student'), getMyAttendance);

router.route('/students/:date')
  .get(protect, authorize('Teacher'), getStudentAttendanceByDate);

module.exports = router;
