const express = require('express');
const router = express.Router();
const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject
} = require('../controllers/subject.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Routes for /api/subjects
router
  .route('/')
  .get(protect, getSubjects) // All logged in users can see subjects
  .post(protect, authorize('Admin'), createSubject); // Only Admin can create

router
  .route('/:id')
  .put(protect, authorize('Admin'), updateSubject) // Only Admin can update
  .delete(protect, authorize('Admin'), deleteSubject); // Only Admin can delete

module.exports = router;