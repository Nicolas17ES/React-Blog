import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserSinglePost, updatePost, savePost, deleteUserPost} from '../features/posts/postsSlice'
import {getComments, createComment} from '../features/comments/commentsSlice'
import {Link, useParams, useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import ShareLinks from '../components/ShareLinks'
import BackButton from '../components/BackButton'
import SingleComment from '../components/SingleComment'
import RatingResults from '../components/RatingResults'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import {BiEditAlt} from 'react-icons/bi'
import {FaPlus} from 'react-icons/fa'
import {BsFillSaveFill, BsFillTrashFill} from 'react-icons/bs'


// modal style
const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

function SinglePost() {
    const [openModal, setOpenModal] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isUserPost, setIsUserPost] = useState(false);

    const { post, isLoading, isError, message} = useSelector((state) => state.posts);
    const { comments, isLoading: commentsIsLoading} = useSelector((state) => state.comments);
    const {user} = useSelector(state => state.auth)
    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {postId} = useParams();

    // get all user tickets
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getUserSinglePost(postId))
        dispatch(getComments(postId))
        if(user._id === post.user){
            setIsUserPost(true);
        } else {
            setIsUserPost(false)
        }
        // eslint-disable-next-line
    }, [isError, message, postId, user, post.user])


    
    // update single ticket form own user

    const changePrivacy = () => {
        dispatch(updatePost(postId))
    }

    // delete post

    const deletePost = () => {
        dispatch(deleteUserPost(postId))
        navigate('/user-posts')
    }

    // MODAL
    // open modal
    const showModal = () =>{
        setOpenModal(true)
    }
    // close modal
    const closeModal = () =>{
        setOpenModal(false)
    }

    // add comment inside modal
    const onCommentSubmit = (e) => {
        e.preventDefault()
        dispatch(createComment({ commentText, postId }))
        .unwrap()
        .then(() => {
            setCommentText('')
            closeModal()
        })
        .catch(toast.error)

    }

    // save post

    const saveThisPost = () => {
        dispatch(savePost({postId}))
    }


    if(isLoading || commentsIsLoading){
        return (
            <Spinner/>
        )
    }

    if(isError){
        <h3>Something went wrong</h3>
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url="/user-posts"/>
                <Link to="/user-profile" state={{
                    userId: post.user,
                    username: post.username,
                    }}>
                        
                    <h2 style={{textTransform: 'capitalize'}}>{post.username}</h2>
                </Link>
                
                <h2 style={{textTransform: 'uppercase'}}>{post.title}</h2>
                <h3>{new Date(post.createdAt).toLocaleString('en-EU')}</h3>
                <hr/>
                <div className="ticket-desc" style={{textTransform: 'capitalize'}}>Category: {post.type}</div>
                <div className="">{post.body}</div>
                
                {post.privatePost ? (
                    <>
                        <span style={{color: "red"}}>This is a private Post</span>
    
                    </>
                ) : (
                    <>
                        <span> <p>Save</p><BsFillSaveFill onClick={saveThisPost}/></span>
                        <RatingResults userId={post.user}/> 
                        <ShareLinks hash={post.type} title={post.title}/>
                        <h2>Comments</h2>
                        {comments.map((comment) => (
                            <SingleComment key={comment._id} comment={comment}/>
                        ))}
                    </>
                )}
        
            </header>

            
            {post.privatePost ? null : (
                <>
                {/* modal */}
                <button onClick={showModal} className="btn"> <FaPlus/> Add Comment</button>
                <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles} contentLabel='Add Comment'>
                    <h2>Add a comment</h2>
                    <button className="btn-close" onClick={closeModal}>Close</button>
                    <form onSubmit={onCommentSubmit}>
                        <div className="form-group">
                            <textarea name="commentText" id="commentText" className="form-control" placeholder="add comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} ></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn" type='submit'>
                                Add comment
                            </button>
                        </div>
                    </form>
                </Modal>
            {/* modal */}

                </>
            )}
            

            {isUserPost && post.privatePost ? (
                <>
                <button className="btn btn-block" onClick={changePrivacy}>Make Post Public <BiEditAlt/></button> 
                </>
            ) : null}
            {isUserPost ? (
                <>
                <button className="btn btn-block" onClick={deletePost}>Delete Post <BsFillTrashFill/></button> 
                </>
            ) : null}
           
        </div>
    )
}

export default SinglePost
