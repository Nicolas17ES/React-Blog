import {useParams} from 'react-router-dom'
import {getRating, createRating, reset} from '../features/rating/ratingSlice'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from './Spinner'
import '../pages/SinglePost.css'
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'






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
        const rounded2 = Math.ceil(rounded) 
        setPercentage(rounded2)

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
        <div className="post-likes">
           {/* {!hideVote && !hideVote2 ? (
               <> */}
               <h4 className="likes-title">Do you agree <span className="likes-title-black">with this post?</span></h4>
                <div className="buttons-likes">
                    <button className="post-like-button" onClick={() => createFeedback(true)}>YES</button>
                    <button className="post-dislike-button" onClick={() => createFeedback(false)}>NO</button> 
                </div>
                {/* <div className="buttons-likes">
                    <button className="post-like-button" onClick={() => createFeedback(true)}><AiOutlinePlus className="minus-plus"/> <AiOutlinePlus className="minus-plus"/></button>
                    <button className="post-dislike-button" onClick={() => createFeedback(false)} ><AiOutlineMinus className="minus-plus"/><AiOutlineMinus className="minus-plus"/></button> 
                </div> */}
               {/* </>
           ): null } */}
           <div className="likes-bottom-block">{rating.length === 0 ? null : <span className="post-total-ikes">{percentage + '%'}</span>} <span className="total-likes-text">{'( of our debaters do )'}</span></div>
           
            
        </div>
        // <div>
        //    {!hideVote && !hideVote2 ? (
        //        <>
        //         <span> <button onClick={() => createFeedback(true)}>Agree</button> {agreeHtml.length} </span>
        //         <span> <button onClick={() => createFeedback(false)} >Disagree</button> {disAgreeHtml.length} </span>
        //        </>
        //    ): null }
        //    {rating.length === 0 ? null : <span>{'Total likes: ' + percentage + '%'}</span>}
            
        // </div>
    )
}

export default RatingResults
