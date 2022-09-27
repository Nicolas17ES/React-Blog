const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Post = require('../models/postModel');




// @desc Get user posts 
// @route GET/api/posts
// @access Private

const getPosts  = asyncHandler(async(req, res) => {

    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const posts = await Post.find({user: req.user.id})
     
    res.status(200).json(posts)
})





// @desc Get user post 
// @route GET/api/post/:id
// @access Private

const getPost  = asyncHandler(async(req, res) => {

    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const post = await Post.findById(req.params.id)

    if(!post){
        res.status(404)
        throw new Error('Post not found')
    }

    if(post.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }
     
    res.status(200).json(post)
})





// @desc Create posts 
// @route POST/api/posts
// @access Private

const createPost  = asyncHandler(async(req, res) => {
    const {type, title, body} = req.body;

    if(!type || !body || !title){
        res.status(400)
        throw new Error('Please add a body a type and a title')
    }
    
    // get user using the id in the jwt
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const post = await Post.create({
        type,
        body,
        title,
        user: req.user.id,
        status: 'new'

    })
    res.status(201).json(post)
})




// @desc Delete post 
// @route DELETE/api/post/:id
// @access Private

const deletePost  = asyncHandler(async(req, res) => {

    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const post = await Post.findById(req.params.id)

    if(!post){
        res.status(404)
        throw new Error('Post not found')
    }

    if(post.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }

    await post.remove();
     
    res.status(200).json({success: true})
})




// @desc Update post 
// @route PUT/api/post/:id
// @access Private

const updatePost  = asyncHandler(async(req, res) => {

    // get user using the id in the jwt
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const post = await Post.findById(req.params.id)

    if(!post){
        res.status(404)
        throw new Error('Post not found')
    }

    if(post.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
     
    res.status(200).json(updatedPost)
})




module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}
  