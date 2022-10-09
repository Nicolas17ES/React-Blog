import {useParams} from 'react-router-dom'
import {getRating, createRating, reset} from '../features/rating/ratingSlice'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from './Spinner'






function RatingResults({userId}) {
    const [agreeHtml, setAgree] = useState([])
    const [disAgreeHtml, setDisAgree] = useState([])
    const [percentage, setPercentage] = useState()
    const [hideVote, setHideVote] = useState(false)
    const [hideVote2, setHideVote2] = useState(false)

    const {postId} = useParams();
    const dispatch = useDispatch();
    const { rating, isLoading, isError, message} = useSelector((state) => state.rating);
    const {user} = useSelector(state => state.auth)




    
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
    }, [isError, message, postId, reset])

    useEffect(() => {
        rating.map((rate) => {
            if(rate.user === user._id){
                setHideVote2(true)
            } else{
                setHideVote2(false)
            }  
        })
    }, [rating, hideVote2])

  

    useEffect(() => {
        if(user._id === userId){
            setHideVote(true)
        } else {
            setHideVote(false)
        }
    }, [user, userId])

    // porcentajes

    useEffect(() => {
        const totalVotes = disAgreeHtml.length + agreeHtml.length

        const percentageResult = (agreeHtml.length / totalVotes) * 100;

        const rounded = (Math.round(percentageResult * 10) / 10).toFixed(1);
        setPercentage(rounded)

        // eslint-disable-next-line
    }, [agreeHtml, disAgreeHtml])

    const createFeedback = (agree) => {
        const ratingData = {
            agree,
            userId,
        }
       
        dispatch(createRating({ratingData, postId }))
        setHideVote(true)
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
           {!hideVote && !hideVote2 ? (
               <>
                <span> <button onClick={() => createFeedback(true)}>Agree</button> {agreeHtml.length} </span>
                <span> <button onClick={() => createFeedback(false)} >Disagree</button> {disAgreeHtml.length} </span>
               </>
           ): null }
           {rating.length === 0 ? null : <span>{'Total likes: ' + percentage + '%'}</span>}
            
        </div>
    )
}

export default RatingResults
