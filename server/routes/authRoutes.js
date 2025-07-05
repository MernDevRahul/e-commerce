const express = require('express');
const { signup, login, getUser, googleLogin } = require('../controllers/authController');
const verifyToken = require("../middleware/authMiddleware")

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/google',googleLogin)
router.get('/me', verifyToken,getUser)

module.exports = router;