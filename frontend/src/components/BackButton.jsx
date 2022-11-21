import {FaArrowCircleLeft} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

function BackButton() {
    
    const navigate = useNavigate();
    return (
        <div className="button-block">
            <button className="back-button" onClick={() => navigate(-1)}>
            </button>
        </div>
    )
}

export default BackButton
