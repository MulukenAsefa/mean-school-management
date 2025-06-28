const express = require('express');
const router = express.Router();
const {
  createGrade,
  getGrades,
  updateGrade,
  deleteGrade
} = require('../controllers/grade.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.route('/')
  .get(protect, getGrades)
  .post(protect, authorize('Admin'), createGrade);

router.route('/:id')
  .put(protect, authorize('Admin'), updateGrade)
  .delete(protect, authorize('Admin'), deleteGrade);

module.exports = router;