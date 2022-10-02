import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'


function Home() {
    const {user} = useSelector ((state) => state.auth);

    return (
        <>
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
        </>
    )
}

export default Home
