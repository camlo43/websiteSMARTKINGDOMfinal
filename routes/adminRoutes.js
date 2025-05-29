const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

router.get('/dashboard', authMiddleware.verifyToken, authMiddleware.authorizeRoles('admin'), adminController.getDashboardData);

module.exports = router;
