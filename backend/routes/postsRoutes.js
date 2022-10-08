const express = require('express');
const commentRouter = require('./commentRoutes')
const ratingRouter = require('./ratingRoutes')
const interestedRouter = require('./interestedRoutes')
const {getPosts, getPost, createPost, deletePost, updatePost, getPostsSearchQuery, getBestRatedPosts, getLatestPosts, getPostsFromOtherUser, getBestRatedPostsFromUser} = require('../controllers/postController')
const {protect} = require('../middleware/authMiddleware');

// we will create definitve route for comments in the postRoutes 

const router = express.Router();

// Re-route into comment router
router.use('/:postId/comments', commentRouter)
router.use('/:postId/rating', ratingRouter)
router.use('/interested/posts', interestedRouter)



router.route('/').get(protect, getPosts).post(protect, createPost);
router.route('/:id').get(protect, getPost).delete(protect, deletePost).put(protect, updatePost)
router.route('/user/:userId').get(getPostsFromOtherUser)
router.route('/search/:query').get(getPostsSearchQuery)
router.route('/best/rated').get(getBestRatedPosts);
router.route('/best/rated/:userId').get(getBestRatedPostsFromUser);
router.route('/latest/posts').get(getLatestPosts);




module.exports = router;