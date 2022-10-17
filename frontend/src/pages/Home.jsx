import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBestRatedPosts, getLatestPosts, reset} from '../features/posts/postsSlice'
import PostItem from '../components/PostItem'
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs'
import Spinner from '../components/Spinner'
import './Home.css'
import HomeSvg1 from '../components/svgs/HomeSvg'



function Home() {
    const {user, instructions} = useSelector ((state) => state.auth);
    const {bestPosts, isLoading, isSuccess} = useSelector((state) => state.posts)
    const [changed, setChanged] = useState(false);
    const [display, setDisplay] = useState(false);
    const location = useLocation();

    const dispatch = useDispatch();

    // get all user tickets
    useEffect(() => {
        console.log(location.state)
        if(location.state !== null){
            if(location.state === 'bestrated'){
                setDisplay(location.state)
                dispatch(getBestRatedPosts())
                
            } else if (location.state === 'latest'){
                dispatch(getLatestPosts())
                 setDisplay(location.state)
            }
        } else{
            setDisplay(false)
        }
        
    }, [dispatch, location.state])


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

    if(instructions.value === 'true'){
        return(
            <h1>Let me guide you</h1>
        )
    }

    return (
        <>
        <div className="wrapper">
            <section className="section-home">
              <h1 className="title">ENTER OUR DEBATE FORUM COMMUNITY</h1>
              <div className="block1">
                  <div className="block-top">
                    <h2 className="block-text1">001</h2>
                    <h2 className="block-text2">create</h2>
                  </div>
                  <div className="block-bottom">
                      <p className="bottom-text1">text-text-text</p>
                        <HomeSvg1/>
                      <p className="bottom-text2">block-block-block</p>
                  </div>
              </div>
              <div className="block2">
                  <div className="block-top">
                    <h2 className="block-text1">002</h2>
                    <h2 className="block-text2">share</h2>
                  </div>
                  <div className="block-bottom">
                     <p className="bottom-text1">text-text-text</p>
                        <HomeSvg1/>
                      <p className="bottom-text2">block-block-block</p>
                  </div>
              </div>
              <div className="block3">
                  <div className="block-top">
                    <h2 className="block-text1">003</h2>
                    <h2 className="block-text2">rate</h2>
                  </div>
                  <div className="block-bottom">
                      <p className="bottom-text1">text-text-text</p>
                        <HomeSvg1/>
                      <p className="bottom-text2">block-block-block</p>
                  </div>
              </div>
              <div className="content">
                  <p className="text1">Lorem ipsum dolor hahah ola casa camisas Lorem ipsum dolor sit amet consectetur..</p>
                  <p className="text2">Lorem ipsum dolor sit amet.</p>
              </div>
            </section>
        </div>

            {/* <section className="heading">
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

            */}
            
            

        
           {display === 'latest' ? <h4>Latest 3</h4> ? display === 'bestrated' : <h4>Top 3</h4> : 'hey'}
           {/* <h4>latest</h4> */}
            <div className="tickets">
                {bestPosts.map((post) => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </> 
    )
}

export default Home
