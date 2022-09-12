const express = require('express');
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

// register
router.post('/', registerUser)

// login
router.post('/login', loginUser)
// access to profile, to do so first we need to pass the authmiddleware function protect which will authoirize the user and go to next function
router.get('/me', protect, getMe)

module.exports = router;