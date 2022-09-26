import {useState} from 'react'
import {useSelector} from 'react-redux'

function NewTicket() {

    const {user} = useSelector((state) => state.auth);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.name);
    
    return (
        <div>
            New Ticket 
        </div>
    )
}

export default NewTicket
