import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getPostsFromQuery} from '../features/posts/postsSlice'
import {logout, reset} from '../features/auth/authSlice'
import {ImSearch} from 'react-icons/im'
import './Header.css'

function Header() {

    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {user} = useSelector(state => state.auth)

    const onLogout = () => {
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
    // const navigateTo = (query) => {
    //     navigate('/',{state:{query: query}})  
    // }





    return (
        <header className="header">
            <nav className="navbar">
                <ul className="nav-grid">
                    <li  className="searchbar">
                        <form onSubmit={onSubmit}>
                            {/* onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} */}
                            <button className="btn-search"><ImSearch size={23}/></button>
                            <input  className="input-nav" type="text" placeholder="Type to Search..." onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}  value={searchQuery}/>
                            
                        </form>
                    </li>
                {user ? (
                    <>
                    <li className="profile-login">
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
                    <li className="profile-login">
                        {/* <Link className="link" to='/login'><FaSignInAlt className="icon-nav"/>Login</Link> */}
                        <Link className="link log" to='/login'><sup>Login</sup></Link>
                    </li>
                    <li className="logout-register">
                        {/* <Link className="link" to='/register'><FaUser className="icon-nav"/>Register</Link> */}
                        <Link className="link reg" to='/register'><sup>Register</sup></Link>
                    </li>
                    </>
                    )}
                    <li className="politics">
                        <h2 className="h2-nav" onClick={() => categorySearch('politics')}>Politics</h2>
                    </li>
                    <li className="society">
                        <h2 className="h2-nav" onClick={() => categorySearch('society')}>Society</h2>
                    </li>
                    <li className="main-title">
                        <Link className="link" to='/'>
                            <h1>DAILY FORUM DEBATES</h1>
                        </Link>
                    </li>
                    <li className="art">
                        <h2 className="h2-nav" onClick={() => categorySearch('art')}>Art</h2>
                    </li>
                    <li className="culture">
                        <h2 className="h2-nav" onClick={() => categorySearch('culture')}>Culture</h2>
                    </li>
                    <li className="bottom-nav">
                        <Link to="/" state={'bestrated'} className="best-rated">Best Rated Debates</Link>
                        <Link to="/" state={'authors'} className="authors">Look for Authors</Link>
                        <Link to="/" state={'latest'} className="latest">Find our Latest Debates</Link>
                    </li>
                    <li className="emptyOne">
                    </li>
                    <li className="emptyTwo">
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
