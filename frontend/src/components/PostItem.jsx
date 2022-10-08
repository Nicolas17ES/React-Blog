import {Link} from 'react-router-dom'

function PostItem({post}) {
    return (
        <div>
            <div className="ticket">
                <Link to="/user-profile" state={{
                    userId: post.user,
                    username: post.username,
                    }}>
                        
                    <div style={{textTransform: 'uppercase'}}>{post.username}</div>
                </Link>
                
                <div>{new Date(post.createdAt).toLocaleString('en-EU')}</div>
                <h2 style={{textTransform: 'uppercase'}}>{post.title}</h2>
                <div style={{textTransform: 'capitalize'}}>{post.type}</div>
                <div>{post.body.substring(0,150) + '...'}</div>
                <Link to={`/post/${post._id}`} className='btn btn-reverse btnn-sm'>VIEW</Link>
            </div>
        </div>
    )
}

export default PostItem
