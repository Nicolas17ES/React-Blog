import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postsService from './postsService'

const initialState = {
    posts: [],
    post: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create a new post

export const createPost = createAsyncThunk('posts/create', async (postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postsService.createPost(postData, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})
// get User posts

export const getUserPosts = createAsyncThunk('posts/getAllUserPosts', async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postsService.getUserPosts(token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})


// get User  single post

export const getUserSinglePost = createAsyncThunk('posts/getUserSinglePost', async (postId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postsService.getUserSinglePost(postId, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})


// update User  single post

export const updatePost = createAsyncThunk('posts/updateUserPost', async (postId, postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postsService.updatePost(postId, postData, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})


export const postSlice = createSlice ({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload

            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserSinglePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserSinglePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.post = action.payload

            })
            .addCase(getUserSinglePost.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updatePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.map((post) => post._id === action.payload._id ? (post = action.payload) : post )

            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = postSlice.actions

export default postSlice.reducer