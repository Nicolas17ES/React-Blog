import {useParams} from 'react-router-dom'
import {getRating, createRating} from '../features/rating/ratingSlice'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from './Spinner'






function RatingResults() {
    const [agreeHtml, setAgree] = useState([])
    const [disAgreeHtml, setDisAgree] = useState([])
    const [percentage, setPercentage] = useState()

    const {postId} = useParams();
    const dispatch = useDispatch();
    const { rating, isLoading, isError, message} = useSelector((state) => state.rating);


    

      // get all rating from post
    useEffect(() => {

        const agrees = []
        const disagrees = []

        if(isError){
            toast.error(message)
        }
        dispatch(getRating(postId))

        rating.map((rate) => {
            if(rate.agree === true){
                agrees.push(rate)
                setAgree(agrees)
            }
            else{
                disagrees.push(rate)
                setDisAgree(disagrees)
            }
        })

        // eslint-disable-next-line
    }, [isError, message, postId])

    // porcentajes

    useEffect(() => {
        const totalVotes = disAgreeHtml.length + agreeHtml.length

        const percentageResult = (agreeHtml.length / totalVotes) * 100;

        const rounded = (Math.round(percentageResult * 10) / 10).toFixed(1);
        setPercentage(rounded)

        // eslint-disable-next-line
    }, [agreeHtml, disAgreeHtml])

    const createFeedback = (agree) => {
       
        dispatch(createRating({agree, postId }))
         if(agree === true){
            setAgree(current => [...current, {agree: true}]);
        } else {
           setDisAgree(current => [...current, {agree: false}]);
        }
        
    }

    if(isLoading){
        return (
            <Spinner/>
        )
    }
    return (
        <div>
           <span> <button onClick={() => createFeedback(true)}>Agree</button> {agreeHtml.length} </span>
           <span> <button onClick={() => createFeedback(false)} >Disagree</button> {disAgreeHtml.length} </span>
            <span>{'Total likes: ' + percentage + '%'}</span>
        </div>
    )
}

export default RatingResults
