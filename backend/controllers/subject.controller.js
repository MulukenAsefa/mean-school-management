const Subject = require('../models/subject.model');

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Private/Admin
exports.createSubject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const subject = new Subject({ name, description });
    const createdSubject = await subject.save();
    res.status(201).json(createdSubject);
  } catch (error) {
    res.status(400).json({ message: 'Subject creation failed', error: error.message });
  }
};

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Private
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a subject
// @route   PUT /api/subjects/:id
// @access  Private/Admin
exports.updateSubject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const subject = await Subject.findById(req.params.id);
    if (subject) {
      subject.name = name;
      subject.description = description;
      const updatedSubject = await subject.save();
      res.json(updatedSubject);
    } else {
      res.status(404).json({ message: 'Subject not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Subject update failed', error: error.message });
  }
};

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Private/Admin
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (subject) {
      res.json({ message: 'Subject removed' });
    } else {
      res.status(404).json({ message: 'Subject not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};