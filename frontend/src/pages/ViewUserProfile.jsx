import { useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPostsFromOtherUser, getUserBestPosts} from '../features/posts/postsSlice'
import Spinner from '../components/Spinner'
import PostItem from '../components/PostItem'
import BackButton from '../components/BackButton'





function ViewUserProfile() {

    const { posts, isLoading, isError, message} = useSelector((state) => state.posts);
    const [showsPosts, setShowPosts] = useState(false);
    // const [postsOrder, setPostsOrder] = useState();


    const location = useLocation();
    const data = location.state;

    const dispatch = useDispatch();

    // get all user tickets
    useEffect(() => {
        dispatch(getPostsFromOtherUser(data.userId))
        // eslint-disable-next-line
    }, [data.userId])
    



    
    // show user posts

    const displayPosts = () => {
        setShowPosts(!showsPosts)
    }

    // SELECT
    // select options
    const options = [
        {value: 'latest', text: 'Latest'},
        {value: 'bestrated', text: 'Best Rated'},
    ];
    const [selected, setSelected] = useState(options[0].value);
    // set value of select button
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    //change posts based select 

    useEffect(() => {
        if (selected === 'bestrated'){
            // setShowPosts(false)
            dispatch(getUserBestPosts(data.userId))
            // setShowPosts(true)
        } else {
             dispatch(getPostsFromOtherUser(data.userId))
        }
    }, [selected])


    if(isLoading){
        return (
            <Spinner/>
        )
    }

    return (
        <div>
            <BackButton></BackButton>
            <h1>{data.username}</h1>
            <h2>Amount of posts: {posts.length}</h2>
            <h2>Best rated posts:</h2>


            <button onClick={displayPosts}>{!showsPosts ? "View all user posts" : "Hide user posts" }</button>
            {showsPosts ? (
                    <select value={selected} onChange={handleChange}>
                        {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                        ))}
                    </select>
            ) : null}
            {showsPosts ? (
                posts.map((post) => ( 
                    <PostItem key={post._id} post={post}/>
                    
                ))
            ) : null}
        </div>
    )
}

export default ViewUserProfile
