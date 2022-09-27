const express = require('express');
const commentRouter = require('./commentRoutes')
const {getPosts, getPost, createPost, deletePost, updatePost} = require('../controllers/postController')
const {protect} = require('../middleware/authMiddleware');

// we will create definitve route for comments in the postRoutes 

const router = express.Router();

// Re-route into comment router
router.use('/:postId/comments', commentRouter)


router.route('/').get(protect, getPosts).post(protect, createPost);
router.route('/:id').get(protect, getPost).delete(protect, deletePost).put(protect, updatePost)


module.exports = router;