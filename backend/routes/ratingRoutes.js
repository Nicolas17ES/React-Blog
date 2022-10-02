const express = require('express');
const {getRating, createRating} = require('../controllers/ratingController')
const {protect} = require('../middleware/authMiddleware');

const router = express.Router({mergeParams: true});

router.route('/').get(protect, getRating).post(protect, createRating);


module.exports = router;
