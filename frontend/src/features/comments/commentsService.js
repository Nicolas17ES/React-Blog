import axios from 'axios';

const API_URL = '/api/posts/';


// create a comment

const createComment = async (commentText, postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + postId + '/comments', {
        text: commentText,
    }, config);

    return response.data;
}

// get all comments form a single posts

const getComments = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + postId + '/comments', config);

    return response.data;
}

const commentsService = {
    getComments,
    createComment,
}

export default commentsService