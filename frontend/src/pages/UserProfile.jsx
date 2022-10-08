import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import BackButton from '../components/BackButton'
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

function UserProfile() {
        
    const {user} = useSelector ((state) => state.auth);

    return (
        <>
            <BackButton url={'/'}></BackButton>
            <section className="heading">
                {user ?  <h1>Welcome to Bloggs {user.username}</h1> : <h1>Welcome to Bloggs</h1>}
                <p>Create a post and share it with our community</p>
            </section>

            <Link to='/new-post' className='btn btn-reverse btn-block'>
                <FaQuestionCircle/> Create New Post
            </Link>
            <Link to='/user-posts' className='btn btn-block'>
                <FaTicketAlt/> View My Posts
            </Link>
            <Link to='/saved-posts' className='btn btn-block'>
                <FaTicketAlt/> View Saved Posts
            </Link>
        </>
    )
}

export default UserProfile
