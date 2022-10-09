import axios from 'axios';

const API_URL = '/api/posts/';


// create a comment

const createRating = async (ratingData, postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + postId + '/rating', {
        userId: ratingData.userId,
        agree: ratingData.agree,
    }, config);

    return response.data;
}

// get all comments form a single posts

const getRating = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + postId + '/rating', config);

    return response.data;
}

const ratingService = {
    getRating,
    createRating,
}

export default ratingService