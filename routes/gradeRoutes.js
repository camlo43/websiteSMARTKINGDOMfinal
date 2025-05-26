const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.verifyToken, gradeController.getAllGrades);
router.get('/student/:studentId', authMiddleware.verifyToken, gradeController.getGradesByStudentId);

module.exports = router;
