const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const { 
  getUsers, 
  deleteUser, 
  updateUser,
  getStudentsByTeacherGrade 
} = require('../controllers/user.controller');
const router = express.Router();

// Route for teachers to get only their assigned students
router.route('/my-students')
  .get(protect, authorize('Teacher'), getStudentsByTeacherGrade);

// Route for Admins to get ALL users
router.route('/')
    .get(protect, authorize('Admin'), getUsers);

// Routes for Admins to manage a specific user
router.route('/:id')
    .delete(protect, authorize('Admin'), deleteUser)
    .put(protect, authorize('Admin'), updateUser);

module.exports = router;