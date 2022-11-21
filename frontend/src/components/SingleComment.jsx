import {useSelector} from 'react-redux'
import '../pages/SinglePost.css'
import {GiTronArrow} from 'react-icons/gi'


function SingleComment({comment, view}) {
    
    console.log(view)
    console.log('hey')

    return (
            <div className="single-comment">
                {view ? (
                    <>
                        <h3 className="comment-username">{comment.username}</h3>
                        <div className="comment-body"> <GiTronArrow className="comment-arrow"/> <p className="comment-text">{comment.text}</p></div>
                        {/* <div className="comment-date">
                            {new Date(comment.createdAt).toLocaleString('en-EU')}
                        </div> */}
                    </>
                ) : null}
            </div>
            
    )
}

export default SingleComment
