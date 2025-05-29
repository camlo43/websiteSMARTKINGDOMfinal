const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.verifyToken, studentController.getAllStudents);
router.get('/:id', authMiddleware.verifyToken, studentController.getStudentById);
router.get('/conSalones', authMiddleware.verifyToken, studentController.getStudentsWithClassroom);

module.exports = router;
