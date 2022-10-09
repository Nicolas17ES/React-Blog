const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Rating = require('../models/ratingModel');
const Post = require('../models/postModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


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
    const userId = req.body.userId

    // get user using the id in the jwt

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    if(userId === req.user.id){
        res.status(401)
        throw new Error('Cannot vote your own post');
    }
    const checkRating = await Rating.aggregate([
        { "$match": { 
            "user": ObjectId(req.user.id),
            "post": ObjectId(req.params.postId),
            }
        },
    ])
    
    // .find({user: req.user.id})

    console.log(checkRating)
    if(checkRating.length < 1){

        const rating = await Rating.create({
            user: req.user.id,
            post: req.params.postId,
            agree: req.body.agree
        })

        res.status(200).json(rating)

    } else {
        res.status(401)
        throw new Error('User has already voted');
    }

    
})






module.exports = {
    getRating,
    createRating,
}


