const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Interested = require('../models/interestedModel');
const Post = require('../models/postModel');


// @desc Get  post rating
// @route GET/api/posts/:postId/rating
// @access Private

const getInterested = asyncHandler(async(req, res) => {

    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const interested = await Interested.find({user: req.user.id})

    const interestedIds = []
    interested.forEach(liked => {
        interestedIds.push(liked.post);
    });

    const posts = await Post.find({_id: {$in: interestedIds}})
     
    res.status(200).json(posts)
})


// @desc Create user interested in post 
// @route POST/api/posts/:postId/interested
// @access Private

const createInterested = asyncHandler(async(req, res) => {

    const {postId} = req.body;
    
    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const interested = await Interested.create({
        user: req.user.id,
        post: postId,
    })
     
    res.status(200).json(interested)
})






module.exports = {
    getInterested,
    createInterested,
}
