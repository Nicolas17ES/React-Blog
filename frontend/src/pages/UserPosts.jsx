import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserPosts, reset} from '../features/posts/postsSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PostItem from '../components/PostItem'

function UserPosts() {

    const {posts, isLoading, isSuccess} = useSelector((state) => state.posts)
    const dispatch = useDispatch();

    // get all user tickets
    useEffect(() => {
        dispatch(getUserPosts())
    }, [dispatch])

    // if we want smth to happen on umount you need to return a function on useffect
    useEffect(() => {
        return () => {
            if(isSuccess){
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])
    



    if(isLoading){
        return(
            <Spinner/>
        )
    }

    return (
        <div>
            <BackButton url={'/'}></BackButton>
            <h1>All your Blog Posts</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Title</div>
                    <div>Type</div>
                    <div>Body</div>
                </div>
                {posts.map((post) => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </div>
    )
}

export default UserPosts
