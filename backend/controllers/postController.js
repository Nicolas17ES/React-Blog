const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const User = require('../models/userModel');
const Post = require('../models/postModel');
const Rating = require('../models/ratingModel');





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




// @desc Get other user posts 
// @route GET/api/posts/user/:userId
// @access Private

const getPostsFromOtherUser  = asyncHandler(async(req, res) => {

    // get user using the id in the jwt
    const user = await User.findById(req.params.userId);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const posts = await Post.find({user: req.params.userId})
     
    res.status(200).json(posts.reverse())
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

    // if(post.user.toString() !== req.user.id){
    //     res.status(401)
    //     throw new Error('Not Authorized')
    // }
     
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
        username: req.user.username.toLowerCase(),
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



// @desc Get posts for search query 
// @route GET/api/posts/search/:query
const getPostsSearchQuery  = asyncHandler(async(req, res) => {
    const searchQuery = req.params.query;
    const posts = await Post.find({$or:[{username: {$regex : searchQuery.toString(), "$options": "i" }}, {type: {$regex : searchQuery.toString(), "$options": "i" }}, {title: {$regex : searchQuery.toString(), "$options": "i" }}]})
    res.status(200).json(posts)
})


// @desc Get best rated postss 
// @route GET/api/posts/best/rated
const getBestRatedPosts  = asyncHandler(async(req, res) => {
    const rating = await Rating.aggregate([
        {"$match" : {"agree" : true}},
        {"$sortByCount" : "$post"},
        {"$limit" : 3}
    ])

    const bestRatedIds = []
    rating.forEach(rate => {
        bestRatedIds.push(rate._id);
    });

    const posts0 = await Post.find({_id: bestRatedIds[0]})
    const posts1 = await Post.find({_id: bestRatedIds[1]})
    const posts2 = await Post.find({_id: bestRatedIds[2]})

    const total = []
    total.push(posts0[0])
    total.push(posts1[0])
    total.push(posts2[0])

    res.status(200).json(total)
})

// @desc Get best rated postss from given user 
// @route GET/api/posts/best/rated/userId
const getBestRatedPostsFromUser  = asyncHandler(async(req, res) => {
    const id = req.params.userId;
    console.log(id)

    const rating = await Rating.aggregate([
        {"$match" : {"agree" : true}},
        {"$sortByCount" : "$post"},
        {"$limit" : 3}
    ])


    const bestRatedIds = []
    rating.forEach(rate => {
        bestRatedIds.push(rate._id);
    });
    console.log(bestRatedIds)

    const posts0 = await Post.aggregate([
        { "$match": { 
            "user": ObjectId(id),
            "_id": bestRatedIds[0],
            }
        },
    ])
    const posts1 = await Post.aggregate([
        { "$match": { 
            "user": ObjectId(id),
            "_id": bestRatedIds[1],
            }
        },
    ])
    const posts2 = await Post.aggregate([
        { "$match": { 
            "user": ObjectId(id),
            "_id": bestRatedIds[2],
            }
        },
    ])

    const total = []
    total.push(posts0[0])
    total.push(posts1[0])
    total.push(posts2[0])
    
    
    // ({_id: {$in: bestRatedIds}})

    res.status(200).json(total)
})


// @desc Get most recent posts 
// @route GET/api/posts/best/rated
const getLatestPosts  = asyncHandler(async(req, res) => {

    const posts = await Post.find().limit(3).sort({_id:-1});

    res.status(200).json(posts)
})



module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    getPostsSearchQuery,
    getBestRatedPosts,
    getLatestPosts,
    getPostsFromOtherUser,
    getBestRatedPostsFromUser,
    getBestRatedPostsFromUser,
}
  