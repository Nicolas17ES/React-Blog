import {useState} from 'react'
import {useSelector} from 'react-redux'

function NewPost() {

    const {user} = useSelector((state) => state.auth);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.name);
    
    return (
        <div>
            New Ticket 
        </div>
    )
}

export default NewPost
