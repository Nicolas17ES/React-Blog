const express = require('express');
const {getInterested, createInterested} = require('../controllers/interestedController')
const {protect} = require('../middleware/authMiddleware');

const router = express.Router({mergeParams: true});

router.route('/').get(protect, getInterested).post(protect, createInterested);


module.exports = router;
