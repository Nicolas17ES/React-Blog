import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'
import ratingReducer from '../features/rating/ratingSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comments: commentsReducer,
    rating: ratingReducer,
  },
});
