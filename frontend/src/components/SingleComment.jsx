import {useSelector} from 'react-redux'


function SingleComment({comment}) {
    

    const {user} = useSelector((state) => state.auth);

    return (
            <div className="note">
                <p>{comment.text}</p>
                
                <div className="note-date">
                    {new Date(comment.createdAt).toLocaleString('en-EU')}
                </div>
            </div>
            
    )
}

export default SingleComment
