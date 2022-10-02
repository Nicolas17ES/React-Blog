const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');



// @desc Get  posts comments 
// @route GET/api/posts/:postId/comments
// @access Private

const getComments  = asyncHandler(async(req, res) => {

    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const post = await Post.findById(req.params.postId)


    const comments = await Comment.find({post: req.params.postId})
     
    res.status(200).json(comments)
})
// @desc Create post comments 
// @route POST/api/posts/:postId/comments
// @access Private

const createComment  = asyncHandler(async(req, res) => {
    console.log(req.user.id)

    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const post = await Post.findById(req.params.postId)

    if(post.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized');
    }

    const comments = await Comment.create({
        post: req.params.postId,
        user: req.user.id,
        username: req.user.username,
        text: req.body.text
    })
     
    res.status(200).json(comments)
})


module.exports = {
    getComments,
    createComment,
}