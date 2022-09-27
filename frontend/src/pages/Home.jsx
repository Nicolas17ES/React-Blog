import {Link} from 'react-router-dom'
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'


function Home() {
    return (
        <>
            <section className="heading">
                <h1>Welcome to Bloggs</h1>
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
