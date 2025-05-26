const Grade = require('../models/Grade');

const gradeController = {
  getAllGrades: async (req, res) => {
    try {
      const grades = await Grade.findAll();
      res.json(grades);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  getGradesByStudentId: async (req, res) => {
    try {
      const grades = await Grade.findByStudentId(req.params.studentId);
      res.json(grades);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
};

module.exports = gradeController;
