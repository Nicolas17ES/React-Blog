import {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getPostsFromQuery} from '../features/posts/postsSlice'
import {logout, reset} from '../features/auth/authSlice'
import {ImSearch} from 'react-icons/im'
import './Header.css'

function Header() {

    const [searchQuery, setSearchQuery] = useState('');
    const [siteLocation, setSiteLocation] = useState('');
    const [category, setCategory] = useState('');
    const {post, isLoading, isError, message} = useSelector((state) => state.posts);
    const scrollLimit = useRef();
    const politics = useRef();
    const [y, setY] = useState(window.scrollY);

    
    useEffect(() => {
        setSiteLocation(window.location.href)
        setCategory(post.type)
    }, [window.location.href, post])

    useEffect(() => { 
            setY(window.scrollY);
            window.addEventListener("scroll", handleNavigation);

            return () => {
                window.removeEventListener("scroll", handleNavigation);
            };
    }, [y])

    const handleNavigation = () => {
        // const bottomElem = scrollLimit.current.offsetTop + scrollLimit.current.offsetHeight - 30;
        //  if (y > bottomElem) {
        //     scrollLimit.current.className = 'move-title';
        //     // politics.current.className = 'move-category';
        // } else if (y < bottomElem) {
        //     scrollLimit.current.className = 'main-title2';
        // }
        // setY(window.scrollY);
    }

    const titleReturn = () => {
        scrollLimit.current.className = 'main-title2';
    }



    

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {user} = useSelector(state => state.auth)

    const onLogout = () => {
        titleReturn()
        dispatch(logout());
        dispatch(reset());
        navigate('/')
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getPostsFromQuery(searchQuery));
        setSearchQuery('');
        navigate('/search',{state:{category: searchQuery}})  
    }
    const categorySearch = (category) => {
        dispatch(getPostsFromQuery(category));
        setSearchQuery('');
        navigate('/search',{state:{category: category}})  
    }
    const navigateTo = () => {
        navigate(-1)  
    }





    return (
        <header className="header">
            <nav className="navbar">
                <ul className="nav-grid">
                    <div className="background"></div>
                    <div className="searchbar-block">
                        <li className="searchbar">
                            <form onSubmit={onSubmit}>
                                {/* onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} */}
                                <button className="btn-search"><ImSearch size={23}/></button>
                                <input  className="input-nav" type="text" placeholder="Type to Search..." onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}  value={searchQuery}/>
                                
                            </form>
                        </li>
                     </div>
                    <li  className="searchbar-text">
                        <p>Version 001 -{'>'} 2022 // By Nicolás Luque // All rights reserved</p>
                    </li>
                
                {user ? (
                    <>
                    <li className="profile-login" onClick={titleReturn}>
                        {/* <Link className="link" to='/profile'><FaUser className="icon-nav"/>Profile</Link> */}
                        <Link className="link prof" to='/profile'><sup>{user.username}</sup></Link>
                    </li>
                    <li className="logout-register">
                        {/* <button className="link" onClick={onLogout}><FaSignOutAlt className="icon-nav"/>Logout</button> */}
                        <div className="link out" onClick={onLogout}><sup>Logout</sup></div>
                    </li>
                    </>
                ) : (
                    <>
                    <li className="profile-login" onClick={titleReturn}>
                        <Link className="link log" to='/login'><sup>Login</sup></Link>
                    </li>
                    <li className="logout-register" onClick={titleReturn}>
                        <Link className="link reg" to='/register'><sup>Register</sup></Link>
                    </li>
                    </>
                    )}
                    <li className="politics">
                        <h2 ref={politics} className={`h2-nav ${category === 'Politics' ? "category-color" : ""}`} onClick={() => categorySearch('politics')}>Politics</h2>
                    </li>
                    <li className="society">
                        <h2 className={`h2-nav ${category === 'Society' ? "category-color" : ""}`} onClick={() => categorySearch('society')}>Society</h2>
                    </li>
                    <li className="main-title">
                        <Link className="link" to='/'>
                            <h1 className="title-header" ref={scrollLimit}>DAILY FORUM DEBATES</h1>
                        </Link>
                    </li>
                    <li className="art">
                        <h2 className={`h2-nav ${category === 'Art' ? "category-color" : ""}`} onClick={() => categorySearch('art')}>Art</h2>
                    </li>
                    <li className="culture">
                        <h2 className={`h2-nav ${category === 'Culture' ? "category-color" : ""}`} onClick={() => categorySearch('culture')}>Culture</h2>
                    </li>

                    {/* {siteLocation === 'http://localhost:3000/' ? (
                        <li className="scroll">
                            <span className="keepScrolling"></span>
                        </li>
                    ): (
                        <li className="scroll" onClick={navigateTo}>
                            <span className="backHome"></span>
                        </li>
                    )} */}
                
                </ul>
            </nav>
        </header>
    )
}

export default Header
