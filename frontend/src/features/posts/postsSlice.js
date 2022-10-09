import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postsService from './postsService'

const initialState = {
    posts: [],
    postsSearch: [],
    bestPosts: [],
    savedPosts: [],
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

// get  posts from other users

export const getPostsFromOtherUser = createAsyncThunk('posts/getPostsFromOtherUser', async (userId, thunkAPI) => {
    try{
        // const token = thunkAPI.getState().auth.user.token;
        return await postsService.getPostsFromOtherUser(userId)
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

// delete user post
export const deleteUserPost = createAsyncThunk('posts/deleteUserPost', async (postId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postsService.deleteUserPost(postId, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// update User  single post

export const updatePost = createAsyncThunk('posts/updateUserPost', async (postId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postsService.updatePost(postId, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// get  posts  from search query

export const getPostsFromQuery = createAsyncThunk('posts/getSearchPosts', async (searchQuery, thunkAPI) => {
    try{
        
        return await postsService.getPostsFromQuery(searchQuery)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})


// get  best rated posts 

export const getBestRatedPosts = createAsyncThunk('posts/getBestRatedPosts', async (_, thunkAPI) => {
    try{
        
        return await postsService.getBestRatedPosts()
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})


// get  best rated posts 

export const getLatestPosts = createAsyncThunk('posts/getLatestPosts', async (_, thunkAPI) => {
    try{
        
        return await postsService.getLatestPosts()
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// get saved posts

export const getSavedPosts = createAsyncThunk('posts/getSavedPosts', async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postsService.getSavedPosts(token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// post: user saves posts

export const savePost = createAsyncThunk('posts/savePost', async (postId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postsService.savePost(postId, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// get user best  posts

export const getUserBestPosts = createAsyncThunk('posts/getUserBestPosts', async (userId, thunkAPI) => {
    try{
        return await postsService.getUserBestPosts(userId)
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
                state.posts.map((post) => post._id === action.payload._id ? (post.privatePost = false) : post)
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteUserPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.filter(post => post._id !== action.payload._id )

            })
            .addCase(deleteUserPost.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPostsFromQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostsFromQuery.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.postsSearch = action.payload;
            })
            .addCase(getPostsFromQuery.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBestRatedPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBestRatedPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bestPosts = action.payload;
            })
            .addCase(getBestRatedPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getLatestPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLatestPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bestPosts = action.payload;
            })
            .addCase(getLatestPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSavedPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSavedPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.savedPosts = action.payload;
            })
            .addCase(getSavedPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(savePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(savePost.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(savePost.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPostsFromOtherUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostsFromOtherUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload;
            })
            .addCase(getPostsFromOtherUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserBestPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserBestPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload;
            })
            .addCase(getUserBestPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = postSlice.actions

export default postSlice.reducer