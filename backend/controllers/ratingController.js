const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Rating = require('../models/ratingModel');
const Post = require('../models/postModel');


// @desc Get  post rating
// @route GET/api/posts/:postId/rating
// @access Private

const getRating = asyncHandler(async(req, res) => {

    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const rating = await Rating.find({post: req.params.postId})
     
    res.status(200).json(rating)
})


// @desc Create post rating 
// @route POST/api/posts/:postId/rating
// @access Private

const createRating  = asyncHandler(async(req, res) => {

    // get user using the id in the jwt

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const rating = await Rating.create({
        user: req.user.id,
        post: req.params.postId,
        agree: req.body.agree
    })
    console.log(rating)
     
    res.status(200).json(rating)
})






module.exports = {
    getRating,
    createRating,
}


