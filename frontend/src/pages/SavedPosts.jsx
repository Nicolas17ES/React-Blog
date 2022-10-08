import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getSavedPosts, reset} from '../features/posts/postsSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PostItem from '../components/PostItem'

function SavedPosts() {
    const {savedPosts, isLoading, isSuccess} = useSelector((state) => state.posts);
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(getSavedPosts())
        // eslint-disable-next-line
    }, [dispatch])


    if(isLoading){
        return(
            <Spinner/>
        )
    }

    return (
        <div>
            <h1>Your saved posts</h1>
            <BackButton url={'/'}></BackButton>
            <h1>All your Blog Posts</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Username</div>
                    <div>Date</div>
                    <div>Title</div>
                    <div>Type</div>
                    <div>Body</div>
                </div>
                {savedPosts.map((post) => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </div>
    )
}

export default SavedPosts
