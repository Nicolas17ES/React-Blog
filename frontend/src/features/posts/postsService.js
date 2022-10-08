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


// get all  posts from other users

const getPostsFromOtherUser = async (userId) => {

    const response = await axios.get(API_URL + '/user/' + userId);

    return response.data;
}


// get all posts form search bar

const getPostsFromQuery = async (searchQuery) => {
  
    const response = await axios.get(API_URL + '/search/' + searchQuery);

    return response.data;
}
// getbest rated posts

const getBestRatedPosts = async () => {
  
    const response = await axios.get(API_URL + '/best/rated');

    return response.data;
}

// get latest posts
const getLatestPosts = async () => {
  
    const response = await axios.get(API_URL + '/latest/posts');

    return response.data;
}


// get saved posts

const getSavedPosts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/interested/posts', config);

    return response.data;
}

// save post
const savePost = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + '/interested/posts', postId, config);

    return response.data;
}

// save post
const getUserBestPosts = async (userId) => {

    const response = await axios.get(API_URL + '/best/rated/' + userId);

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
    getPostsFromQuery,
    getBestRatedPosts,
    getLatestPosts,
    getSavedPosts,
    savePost,
    getPostsFromOtherUser,
    getUserBestPosts,
}

export default ticketService