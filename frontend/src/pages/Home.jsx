import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBestRatedPosts, getLatestPosts, reset} from '../features/posts/postsSlice'
import PostItem from '../components/PostItem'
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs'
import Spinner from '../components/Spinner'
import './Home.css'
import HomeSvg1 from '../components/svgs/HomeSvg'
import LazyLoad from 'react-lazyload';
import NewsPaper from '../assets/kid-news.jpg'
import Homie from '../assets/homie.jpg'
import {GiBeveledStar} from 'react-icons/gi'
import {HiOutlinePlus} from 'react-icons/hi'
import {GiBranchArrow} from 'react-icons/gi'
import {TbCircleDotted} from 'react-icons/tb'



function Home() {
    const {user, instructions} = useSelector ((state) => state.auth);
    const {bestPosts, isLoading, isSuccess} = useSelector((state) => state.posts)
    const [changed, setChanged] = useState(false);
    const [display, setDisplay] = useState(false);
    const location = useLocation();

    const dispatch = useDispatch();

    // get all user tickets
    useEffect(() => {
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
        <div className="main-content">
            <div className="uno">
              
                    <Link to="/" state={'bestrated'} className="best-rated">Best Rated Debates</Link>
                    <Link to="/" state={'authors'} className="authors">Look for Authors</Link>
                    <Link to="/" state={'latest'} className="latest">Find our Latest Debates</Link>


            </div>

            <div className="dos"></div>
            <div className="tres">
                <GiBranchArrow className="rose" size={25}/>
                <LazyLoad once>
                    <img src={NewsPaper} className="newspaper-image" />
                </LazyLoad>
            </div>
            <div className="cuatro"></div>
            <div className="cinco"></div>
            <div className="seis">
                <p>“Never doubt that a small group of thoughtful, concerned citizens can change world. Indeed it is the only thing that ever has.”</p>
            </div>
            <div className="siete"></div>
            <div className="ocho"></div>
            <div className="nueve">
                <HiOutlinePlus/> <HiOutlinePlus/>
            </div>
            <div className="diez">
                <p>"The darkest places in hell are reserved for those who maintain their neutrality in times of moral crisis."</p>
                {/* <span className="stars"><GiBeveledStar size={15}/> <GiBeveledStar size={15}/> <GiBeveledStar size={15}/> <GiBeveledStar size={15}/> <GiBeveledStar size={15}/></span> */}
            </div>
            <div className="once"></div>
            <div className="doce"><GiBranchArrow className="rose2" size={25}/></div>
            <div className="trece"></div>
            <div className="catorce"></div>
            <div className="quince"></div>
            <div className="dieciseis"><div>50 - 70</div></div>
            <div className="diecisiete">
                <p>THOUGHT</p><TbCircleDotted /><p>FOR</p><TbCircleDotted /> <p>THOUGHT</p>
                {/* <p><TbCircleDotted /> THOUGHT</p>
                <p><TbCircleDotted/> FOR</p>
                <p><TbCircleDotted/> THOUGHT</p> */}
            </div>
            {/* <div className="dieciocho"></div> */}
            <div className="diecinueve"></div>
            <div className="veinte">
                <p>Opinion</p>
            </div>
            <div className="veintiuno">
                <LazyLoad once>
                    <img src={Homie} className="wall-image" />
                </LazyLoad>
            </div>
            <div className="veintidos">
                <GiBranchArrow className="rose3" size={25}/>
            </div>
            <div className="veintitres">
                {/* <div className="redonda-tres">
                </div>
                <div className="redonda-tres2">
                </div> */}
            </div>
            <div className="veinticuatro"></div>
            <div className="veinticinco">
                <p>Community</p>
            </div>
            <div className="veintiseis"></div>
            <div className="veintisiete">
                {/* <GiGClef size={30}/><GiGClef size={30}/> */}
            </div>
            <div className="veintiocho">
                <p>“Never doubt that a small group of thoughtful, concerned citizens can change world. Indeed it is the only thing that ever has.”</p>
            </div>
            <div className="veintinueve">
                {/* <GiGClef size={30}/><GiGClef size={30}/> */}
                 <HiOutlinePlus/> <HiOutlinePlus/>
            </div>
            <div className="treinta"> <p>People</p></div>
            <div className="treintauno"></div>
            <div className="treintados">
                <GiBranchArrow className="rose4" size={25}/>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
                <span className="palettes"></span>
            </div>
            <div className="treintatres">
            </div>
            {/* <div className="trintacuatro"></div> */}
            {/* <div className="trintacinco"></div>
           
            <div className="treintaseis"></div>
            <div className="treintasiete"></div>
            <div className="treintaocho">
            </div>
            <div className="treintanueve"></div>
            <div className="cuarenta"></div>
            <div className="cuarentauno"></div>
            <div className="cuarentados"></div>
            <div className="cuarentatres"></div>
            <div className="cuarentacuatro"></div>
            <div className="cuarentacinco"></div>
            <div className="cuarentseis"></div>
            <div className="cuarentasiete"></div>
            <div className="cuarentaocho"></div>
            <div className="cuarentanueve"></div>
            <div className="cincuenta"></div>
            <div className="cincuentauno"></div>
            <div className="cincuentados"></div>
            <div className="cincuentatres"></div>
            <div className="cincuentacuatro"></div> */}

        </div>
        
        {/* <div className="wrapper">
            <section className="section-home">
              <h1 className="title">JOIN THE COMMUNITY</h1>
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
        </div> */}

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
            
            

        
           {/* {display === 'latest' ? <h4>Latest 3</h4> ? display === 'bestrated' : <h4>Top 3</h4> : 'hey'}
            <div className="tickets">
                {bestPosts.map((post) => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div> */}
        </> 
    )
}

export default Home
