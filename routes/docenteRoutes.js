const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');
const authMiddleware = require('../middleware/auth');

router.get('/mis-estudiantes/:docente_id', authMiddleware.verifyToken, docenteController.getMisEstudiantes);
router.get('/info-estudiante', authMiddleware.verifyToken, docenteController.getInfoEstudiante);
router.get('/teacher-profile/:teacher_id', authMiddleware.verifyToken, docenteController.getTeacherProfile);

module.exports = router;
