import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBestRatedPosts, getLatestPosts, reset} from '../features/posts/postsSlice'
import PostItem from '../components/PostItem'
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs'
import Spinner from '../components/Spinner'



function Home() {
    const {user} = useSelector ((state) => state.auth);
    const {bestPosts, isLoading, isSuccess} = useSelector((state) => state.posts)

    const [changed, setChanged] = useState(false);

    const dispatch = useDispatch();

    // get all user tickets
    useEffect(() => {
        dispatch(getBestRatedPosts())
    }, [dispatch])


    // change to latest posts

    const latestPosts = () => {
        dispatch(getLatestPosts());
        setChanged(true)
    }
    // change to best posts

    const getBestPosts = () => {
        dispatch(getBestRatedPosts());
        setChanged(false)
    }

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
        <>
            <section className="heading">
                {user ?  <title>Welcome to Bloggs {user.username}</title> : <title>Welcome to Bloggs</title>}
                {!changed ? (
                    <>
                        <h2>Take a look at the hotest topics of the moment</h2>
                        <BsFillArrowRightCircleFill onClick={latestPosts} style={{marginRight: '50px'}}/>                        
                        
                    </>
                )  : (
                    <>
                        <h2>Take a look at the most recent posts </h2>
                        <BsFillArrowLeftCircleFill onClick={getBestPosts}/>
                    </>
                )}
            </section>

            
            
            

        
           {changed ? <h4>Latest 3</h4> : <h4>Top 3</h4>}
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Username</div>
                    <div>Date</div>
                    <div>Title</div>
                    <div>Type</div>
                    <div>Body</div>
                </div>
                {bestPosts.map((post) => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </>
    )
}

export default Home
