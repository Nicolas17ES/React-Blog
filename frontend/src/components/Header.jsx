import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getPostsFromQuery} from '../features/posts/postsSlice'
import {logout, reset} from '../features/auth/authSlice'

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
        navigate('/search')  
    }





    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>Support Desk</Link>
                <form onSubmit={onSubmit}>
                    <input type="text" onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} value={searchQuery}/>
                    <button type="submit">Search</button>
                </form>
                
            </div>
            <ul>
                {user ? (
                    <>
                        <li>
                                <Link to='/profile'><FaUser/>Profile</Link>
                        </li>
                        <li>
                            <button className="btn" onClick={onLogout}><FaSignOutAlt/>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'><FaSignInAlt/>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'><FaUser/>Register</Link>
                        </li>
                    </>
                )}
        
            </ul>
        </header>
    )
}

export default Header
