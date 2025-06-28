const Mark = require('../models/mark.model');
const User = require('../models/user.model');

// @desc    Assign or update a mark
// @route   POST /api/marks
// @access  Private/Teacher
exports.assignMark = async (req, res) => {
  const { studentId, subjectId, marks } = req.body;
  try {
    // Find if a mark already exists for this student and subject
    let mark = await Mark.findOne({ student: studentId, subject: subjectId });

    if (mark) {
      // Update existing mark
      mark.marks = marks;
    } else {
      // Create new mark
      mark = new Mark({ student: studentId, subject: subjectId, marks });
    }
    const savedMark = await mark.save();
    res.status(201).json(savedMark);
  } catch (error) {
    res.status(400).json({ message: 'Mark assignment failed', error: error.message });
  }
};

// @desc    Get all marks for a specific student
// @route   GET /api/marks/student/:studentId
// @access  Private
exports.getMarksForStudent = async (req, res) => {
  try {
    const marks = await Mark.find({ student: req.params.studentId }).populate('subject', 'name');
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get marks for the currently logged-in student
// @route   GET /api/marks/mystudent
// @access  Private/Student
exports.getMyMarks = async (req, res) => {
  try {
    const marks = await Mark.find({ student: req.user._id }).populate('subject', 'name description');
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};