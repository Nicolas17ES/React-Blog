import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserSinglePost, updatePost} from '../features/posts/postsSlice'
import {getComments, createComment} from '../features/comments/commentsSlice'
import {useParams, useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import SingleComment from '../components/SingleComment'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import {BiEditAlt} from 'react-icons/bi'
import {FaPlus} from 'react-icons/fa'

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

    const { post, isLoading, isError, message} = useSelector((state) => state.posts);
    const { comments, isLoading: commentsIsLoading} = useSelector((state) => state.comments);

    const dispatch = useDispatch();
    const {postId} = useParams();



    // get all user tickets
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getUserSinglePost(postId))
        dispatch(getComments(postId))
        // eslint-disable-next-line
    }, [isError, message, postId])

    
    // update single ticket form own user

    const updateTicket = () => {
        console.log('hey')
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
                <h2 style={{textTransform: 'uppercase'}}>{post.title}</h2>
                <h3>{new Date(post.createdAt).toLocaleString('en-EU')}</h3>
                <hr/>
                <div className="ticket-desc">Category: {post.type}</div>
                <div className="">{post.body}</div>
                <h2>Comments</h2>
                {comments.map((comment) => (
                    <SingleComment key={comment._id} comment={comment}/>
                ))}
            </header>

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

            <button className="btn btn-block" onClick={updateTicket}> <BiEditAlt/></button>
           
        </div>
    )
}

export default SinglePost
