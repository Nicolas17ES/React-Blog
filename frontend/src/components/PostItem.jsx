import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './PostItem.css'
import {GiWorld} from 'react-icons/gi'
import {BsPaintBucket, BsNewspaper} from 'react-icons/bs'
import {AiFillAlert} from 'react-icons/ai'

function PostItem({post}) {
    const [icon, setIcon] = useState(post.type);

    // useEffect(() => {
    //     console.log(post.type)
    //     setIcon(post.type)
    //     //  if(post.type === 'politics'){
    //     //     setIcon(<AiFillAlert className="article-logo"/>)
    //     // } else if (post.type === 'art'){
    //     //     setIcon(<BsPaintBucket className="article-logo"/>)
    //     // } else if (post.type === 'society'){
    //     //     setIcon(<GiWorld className="article-logo"/>)
    //     // } else if (post.type === 'culture') {
    //     //     setIcon(<BsNewspaper className="article-logo"/>)
    //     // } else {
    //     //     return null
    //     // }
    // }, [post.type])

    // const icon = () => {
    //     if(post.type === 'politics'){
    //         return <AiFillAlert/>
    //     } else if (post.type === 'art'){
    //         return <BsPaintBucket/>
    //     } else if (post.type === 'society'){
    //         return <GiWorld/>
    //     } else {
    //         return <BsNewspaper/>
    //     }
    // }

    return (
        <div>
            <div className="article">
                {/* {post.type === 'politics' ? <p className="article-logo">politics</p> : post.type === 'art' ? <p className="article-logo">art</p> : post.type === 'society' ? <p className="article-logo">society</p> : <p className="article-logo">culture</p>} */}
                <Link className="article-author" to="/user-profile" state={{
                    userId: post.user,
                    username: post.username,
                    }}>
                        
                    <div style={{textTransform: 'copitalize'}}> By {post.username}</div>
                </Link>
                
                <div  className="date">{new Date(post.createdAt).toLocaleString('en-EU')}</div>
                <h2  className="article-title" style={{textTransform: 'uppercase'}}>{post.title}</h2>
                <div  className="article-type">{post.type}</div>
                <div  className="article-body">"{post.body.substring(0,250) + '...'}"</div>
                <Link to={`/post/${post._id}`} className='view-post-button'>Read more...</Link>
            </div>
        </div>
    )
}

export default PostItem
