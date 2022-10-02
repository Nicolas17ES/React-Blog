import {Link} from 'react-router-dom'

function PostItem({post}) {
    return (
        <div>
            <div className="ticket">
                <div>{post.username}</div>
                <div>{new Date(post.createdAt).toLocaleString('en-EU')}</div>
                <h2 style={{textTransform: 'uppercase'}}>{post.title}</h2>
                <div>{post.type}</div>
                <div>{post.body}</div>
                <Link to={`/post/${post._id}`} className='btn btn-reverse btnn-sm'>VIEW</Link>
            </div>
        </div>
    )
}

export default PostItem
