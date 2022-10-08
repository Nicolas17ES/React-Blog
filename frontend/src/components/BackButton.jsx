import {FaArrowCircleLeft} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

function BackButton() {
    
    const navigate = useNavigate();
    return (
        <button className="btn btn-reverse btn-back" onClick={() => navigate(-1)}>
            <FaArrowCircleLeft/> Go Back
        </button>
    )
}

export default BackButton
