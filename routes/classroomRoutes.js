const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.verifyToken, classroomController.getAllClassrooms);
router.get('/:id', authMiddleware.verifyToken, classroomController.getClassroomById);

module.exports = router;
