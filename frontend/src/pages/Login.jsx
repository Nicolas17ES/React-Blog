import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Login() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password1: ''
    });

    const {email, password} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isError, isLoading, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        // redirect when logged in
        if(isSuccess && user){
            navigate(-1)
        }

        dispatch(reset)
        
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt/> Login
                </h1>
                <p>Please Login to get support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" name='email' id='email' value={email} onChange={onChange} placeholder='Enter your email' required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name='password' id='password' value={password} onChange={onChange} placeholder='Enter a password' required/>
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

export default Login
