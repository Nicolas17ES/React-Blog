import {useSelector} from 'react-redux'


function SingleComment({comment}) {
    

    return (
            <div className="note">
                <h3>{comment.username}</h3>
                <p>{comment.text}</p>
                <div className="note-date">
                    {new Date(comment.createdAt).toLocaleString('en-EU')}
                </div>
            </div>
            
    )
}

export default SingleComment
