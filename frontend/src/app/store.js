import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comments: commentsReducer,
  },
});
