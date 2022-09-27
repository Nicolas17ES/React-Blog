import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import commentsService from './commentsService'

const initialState = {
    comments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}




// functions

// create comment
export const createComment = createAsyncThunk('comments/create', async ({commentText, postId}, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await commentsService.createComment(commentText, postId, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// get comments
export const getComments = createAsyncThunk('comments/getAll', async (postId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await commentsService.getComments(postId, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})





export const commentsSlice = createSlice ({
    name: 'comments',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.comments = action.payload
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.comments.push(action.payload)
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
          
    }
})

export const {reset} = commentsSlice.actions

export default commentsSlice.reducer