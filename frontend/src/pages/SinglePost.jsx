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
import {RiDoubleQuotesL, RiDoubleQuotesR} from 'react-icons/ri'
import {BsFillSaveFill, BsFillTrashFill} from 'react-icons/bs'
import {TbCircleDotted} from 'react-icons/tb'
import {GiBranchArrow} from 'react-icons/gi'
// import {TfiThought} from 'react-icons/tfi'
import './SinglePost.css'


// modal style
const customStyles = {
    content: {
        width: '700px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // backdropFilter: 'blur(5px)',
        backgroundColor: '#252525',
        zIndex: '10000',
    },
}

Modal.setAppElement('#root')

function SinglePost() {
    const [openModal, setOpenModal] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isUserPost, setIsUserPost] = useState(false);
    const [view, setView] = useState(false);
    const [body1, setBody1] = useState('');
    const [body2, setBody2] = useState('');
    const [date, setDate] = useState('');

    const { post, isLoading, isError, message} = useSelector((state) => state.posts);
    const { comments } = useSelector((state) => state.comments);
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

    // divide post in two
    useEffect(() => {
        if(post.body){
            let index = post.body.indexOf('.');

            let beforeDot = post.body.slice(0, index + 1);
            setBody1(beforeDot)
            let afterDot = post.body.substr( post.body.indexOf('.') + 1 );
            setBody2(afterDot)

        }
        console.log(comments)
        // eslint-disable-next-line
    }, [post])
    useEffect(() => {
        if(post.createdAt){

            let date = post.createdAt.slice(0, 10);
            setDate(date)

        }
        // eslint-disable-next-line
    }, [post])


    
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


    if(isLoading){
        return (
            <Spinner/>
        )
    }

    if(isError){
        <h3>Something went wrong</h3>
    }

    return (
        <section className="single-post">
                <BackButton url="/user-posts"/>
                <Link className="post-author" to="/user-profile" state={{
                    userId: post.user,
                    username: post.username,
                    }}>
                        
                    <h2 className="author-name">Created by <span className="username">{post.username}</span></h2>
                    {/* <h2 className="author-name"><span className="written">Written</span> Created by <span className="username">{post.username}</span></h2> */}
                </Link>
                
                <h2 className="post-title" style={{textTransform: 'uppercase'}}>{post.title}</h2>
                {/* <div className="post-category"><span className="category-name">{post.type}</span></div> */}
                <div className="post-main">
                    <div className="post-body1"> <RiDoubleQuotesL/>{body1}<RiDoubleQuotesR/></div>
                    {/* <div className="post-interested">5 People interested</div> */}
                    <div className="post-body2"><p className="body2-text">{body2}</p></div>
                    <h3 className="post-date">{date}</h3>
                    <div className="main-circles">
                        <TbCircleDotted className="circles-main"/><p className="end">THE END</p><TbCircleDotted className="circles-main"/>
                    </div>
                    
                </div>
                
                {/* {post.privatePost ? (
                    <> */}
                        <span className="post-private" style={{color: "red"}}>This is a private Post</span>
    
                    {/* </>
                ) : (
                    <> */}
                        <span className="save-post"> <p>Save this <GiBranchArrow className="debate-arrow"/> <span className="span-post" onClick={saveThisPost}>DEBATE</span></p></span>
                        <RatingResults userId={post.user}/> 
                        <ShareLinks hash={post.type} title={post.title}/>
                        <section className="post-comments">
                            {!view ? (
                                <h3> <GiBranchArrow className="comments-arrow"/> <span className="comment-title">{'(' + 'to VIEW comments' + ')'}</span> <span onClick={() => setView(!view)} className="click-here">VIEW</span></h3>
                            ) : (
                                <h3> <GiBranchArrow className="comments-arrow"/> <span className="comment-title">{'(' + 'to HIDE comments' + ')'}</span> <span onClick={() => setView(!view)} className="click-here">HIDE</span></h3>
                            )}
                            {comments.map((comment) => (
                                <SingleComment key={comment._id} comment={comment} view={view}/>
                            ))}
                        </section>
                        <div className="add-comments2">
                            <h3><span className="click-here2" onClick={showModal}>ADD</span><GiBranchArrow className="add-arrow"/>  <span className="comment-title">{'(' + 'to ADD comments' + ')'}</span></h3>
                        </div>
                    {/* </>
                )} */}
        

            
            {/* {post.privatePost ? null : (
                <> */}
                {/* modal */}
                <div className="divisor">
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                    <div className="circle-divisor"></div>
                </div>
                {/* <div className="post-add-comment-button">
                    <span className="add-circles"><GiBranchArrow className="circle-add"/><GiBranchArrow className="circle-add"/><p className="add-text">SHARE THIS DEBATE</p><GiBranchArrow className="circle-add"/><GiBranchArrow className="circle-add"/></span>
                    <div className="face-twit">
                        <span>{'(' + 'on FaceBook' + ')'}</span>
                        <span>{'(' + 'or Twitter' + ')'}</span>
                    </div>
                    <div className="face-twit">
                        <button className="comment-button">FB</button>
                        <button className="comment-button">TW</button>
                    </div>
                </div> */}
                <Modal classname="modal-comment" isOpen={openModal} onRequestClose={closeModal} style={customStyles} contentLabel='Add Comment'>
                    <h2 className="modal-title"><GiBranchArrow className="arrow-modal"/> SHARE YOUR THOUGHTS BELOW <GiBranchArrow className="arrow-modal"/></h2>
                    <button className="close-modal" onClick={closeModal}>X</button>
                    <form className="form-comment" onSubmit={onCommentSubmit}>
                        <div className="form-group">
                            <textarea name="commentText" id="commentText" className="input-comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} ></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn-comment" type='submit'>
                                SHARE
                            </button>
                        </div>
                    </form>
                </Modal>
            {/* modal */}

                {/* </>
            )}
             */}

            {/* {isUserPost && post.privatePost ? (
                <> */}
                <button className="post-make-public-button" onClick={changePrivacy}>Make Post Public <BiEditAlt/></button> 
                {/* </>
            ) : null}
            {isUserPost ? (
                <> */}
                <button className="post-delete-button" onClick={deletePost}>Delete Post <BsFillTrashFill/></button> 
                {/* </>
            ) : null} */}
           
        </section>
        // <div className="ticket-page">
        //     <header className="ticket-header">
        //         <BackButton url="/user-posts"/>
        //         <Link to="/user-profile" state={{
        //             userId: post.user,
        //             username: post.username,
        //             }}>
                        
        //             <h2 style={{textTransform: 'capitalize'}}>{post.username}</h2>
        //         </Link>
                
        //         <h2 style={{textTransform: 'uppercase'}}>{post.title}</h2>
        //         <h3>{new Date(post.createdAt).toLocaleString('en-EU')}</h3>
        //         <hr/>
        //         <div className="ticket-desc" style={{textTransform: 'capitalize'}}>Category: {post.type}</div>
        //         <div className="">{post.body}</div>
                
        //         {post.privatePost ? (
        //             <>
        //                 <span style={{color: "red"}}>This is a private Post</span>
    
        //             </>
        //         ) : (
        //             <>
        //                 <span> <p>Save</p><BsFillSaveFill onClick={saveThisPost}/></span>
        //                 <RatingResults userId={post.user}/> 
        //                 <ShareLinks hash={post.type} title={post.title}/>
        //                 <h2>Comments</h2>
        //                 {comments.map((comment) => (
        //                     <SingleComment key={comment._id} comment={comment}/>
        //                 ))}
        //             </>
        //         )}
        
        //     </header>

            
        //     {post.privatePost ? null : (
        //         <>
        //         {/* modal */}
        //         <button onClick={showModal} className="btn"> <FaPlus/> Add Comment</button>
        //         <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles} contentLabel='Add Comment'>
        //             <h2>Add a comment</h2>
        //             <button className="btn-close" onClick={closeModal}>Close</button>
        //             <form onSubmit={onCommentSubmit}>
        //                 <div className="form-group">
        //                     <textarea name="commentText" id="commentText" className="form-control" placeholder="add comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} ></textarea>
        //                 </div>
        //                 <div className="form-group">
        //                     <button className="btn" type='submit'>
        //                         Add comment
        //                     </button>
        //                 </div>
        //             </form>
        //         </Modal>
        //     {/* modal */}

        //         </>
        //     )}
            

        //     {isUserPost && post.privatePost ? (
        //         <>
        //         <button className="btn btn-block" onClick={changePrivacy}>Make Post Public <BiEditAlt/></button> 
        //         </>
        //     ) : null}
        //     {isUserPost ? (
        //         <>
        //         <button className="btn btn-block" onClick={deletePost}>Delete Post <BsFillTrashFill/></button> 
        //         </>
        //     ) : null}
           
        // </div>
    )
}

export default SinglePost
