const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/estudiantes', authMiddleware, estudiantesController.getMisEstudiantes);

module.exports = router;
