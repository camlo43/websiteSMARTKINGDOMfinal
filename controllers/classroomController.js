const Classroom = require('../models/Classroom');

const classroomController = {
  getAllClassrooms: async (req, res) => {
    try {
      const classrooms = await Classroom.findAll();
      res.json(classrooms);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  getClassroomById: async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }
      res.json(classroom);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
};

module.exports = classroomController;
