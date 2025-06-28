const Grade = require('../models/grade.model');

// @desc    Create a new grade
// @route   POST /api/grades
// @access  Private/Admin
exports.createGrade = async (req, res) => {
  const { name } = req.body;
  try {
    const grade = new Grade({ name });
    const createdGrade = await grade.save();
    res.status(201).json(createdGrade);
  } catch (error) {
    res.status(400).json({ message: 'Grade creation failed', error: error.message });
  }
};

// @desc    Get all grades
// @route   GET /api/grades
// @access  Private
exports.getGrades = async (req, res) => {
  try {
    const grades = await Grade.find({}).populate('teacher', 'name'); // Populate teacher name
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a grade (including assigning a teacher)
// @route   PUT /api/grades/:id
// @access  Private/Admin
exports.updateGrade = async (req, res) => {
  const { name, teacherId } = req.body;
  try {
    const grade = await Grade.findById(req.params.id);
    if (grade) {
      grade.name = name;
      if(teacherId) grade.teacher = teacherId; // Assign teacher
      const updatedGrade = await grade.save();
      res.json(updatedGrade);
    } else {
      res.status(404).json({ message: 'Grade not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Grade update failed', error: error.message });
  }
};

// @desc    Delete a grade
// @route   DELETE /api/grades/:id
// @access  Private/Admin
exports.deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (grade) {
      res.json({ message: 'Grade removed' });
    } else {
      res.status(404).json({ message: 'Grade not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};