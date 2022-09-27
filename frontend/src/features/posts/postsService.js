import axios from 'axios';

const API_URL = '/api/posts';

// create new post
const createPost = async (postData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, postData, config);

    return response.data;
}

// get a  own single post

const getUserSinglePost = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/' + postId, config);

    return response.data;
}
// update User  single post

const updatePost = async (postId, postData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/' + postId, postData, config);

    return response.data;
}




// get all user posts

const getUserPosts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);

    return response.data;
}



// delete post




// update post




// export functions

const ticketService = {
    createPost,
    getUserPosts,
    getUserSinglePost,
    updatePost,
}

export default ticketService