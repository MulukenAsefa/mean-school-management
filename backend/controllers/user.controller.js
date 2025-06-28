const User = require('../models/user.model');
const Grade = require('../models/grade.model'); // Import Grade model

// GET /api/users - Used by Admin
exports.getUsers = async (req, res) => {
    const users = await User.find().select('-password').populate('grade', 'name');
    res.json(users);
};

// @desc    Get students that belong to the logged-in teacher's grade
// @route   GET /api/users/my-students
// @access  Private/Teacher
exports.getStudentsByTeacherGrade = async (req, res) => {
  try {
    // 1. Find the grades assigned to this teacher
    const grades = await Grade.find({ teacher: req.user._id });

    if (!grades || grades.length === 0) {
      // If the teacher isn't assigned to any grade, return an empty array
      return res.json([]);
    }

    // 2. Get an array of grade IDs
    const gradeIds = grades.map(grade => grade._id);

    // 3. Find all students who are assigned to any of those grades
    const students = await User.find({ role: 'Student', grade: { $in: gradeIds } }).select('-password');
    res.json(students);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// DELETE /api/users/:id - Used by Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// PUT /api/users/:id - Used by Admin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      if (user.role === 'Student') {
        user.grade = req.body.gradeId || user.grade;
      } else {
        user.grade = undefined;
      }
      
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        grade: updatedUser.grade,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'User update failed', error: error.message });
  }
};