const express = require('express');
const router = express.Router();
const {
  assignMark,
  getMarksForStudent,
  getMyMarks
} = require('../controllers/mark.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.route('/')
  .post(protect, authorize('Teacher'), assignMark);

router.route('/mystudent')
  .get(protect, authorize('Student'), getMyMarks);
  
router.route('/student/:studentId')
  .get(protect, getMarksForStudent);

module.exports = router;