import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createPost, reset} from '../features/posts/postsSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewPost() {

    const {user} = useSelector((state) => state.auth);
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.posts);


    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [privatePost, setPrivatePost] = useState(false);
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            dispatch(reset())
            navigate('/user-posts')
        }

        dispatch(reset())

    }, [dispatch, isError, isSuccess, navigate, message])

    const handleChange = () => {  
        setPrivatePost(!privatePost);
    }; 
  

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({type, title, body, privatePost}))
    }

    if(isLoading){
        return <Spinner/>
    }
    
    return (
        <>
        <BackButton url={"/"}></BackButton>
            <section className="heading">
                <h1>Create a Post for your blog</h1>
                <p>Fill in all the required data</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">User Name</label>
                    <input type="text" className="form-control" value={name} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">User Email</label>
                    <input type="text" className="form-control" value={email} disabled/>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="type">Post Type</label>
                        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value=""></option>
                            <option value="Culture" >Culture</option>
                            <option value="Art">Art</option>
                            <option value="Politics">Politics</option>
                            <option value="Society">Society</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Post Title</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Post Body</label>
                        <textarea name="body" id="body" className="form-control" placeholder="Body text" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label class="switch">Private Post</label>
                        <input type="checkbox" onChange={handleChange}/>
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewPost
