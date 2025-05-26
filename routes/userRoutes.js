const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.verifyToken, authMiddleware.authorizeRoles('admin'), userController.getAllUsers);

module.exports = router;
