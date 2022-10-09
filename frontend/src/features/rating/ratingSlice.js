import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import ratingService from './ratingService'

const initialState = {
    rating: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}




// functions

// create comment
export const createRating = createAsyncThunk('rating/create', async ({ratingData, postId}, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await ratingService.createRating(ratingData, postId, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// get comments
export const getRating = createAsyncThunk('rating/getAll', async (postId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await ratingService.getRating(postId, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})





export const ratingSlice = createSlice ({
    name: 'rating',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRating.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.rating = action.payload
            })
            .addCase(getRating.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRating.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.rating.push(action.payload)
            })
            .addCase(createRating.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
          
    }
})

export const {reset} = ratingSlice.actions

export default ratingSlice.reducer