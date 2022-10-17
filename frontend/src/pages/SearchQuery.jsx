import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PostItem from '../components/PostItem'
import {useLocation} from 'react-router-dom';


function SearchQuery() {
    const {postsSearch, isLoading, isSuccess, isError} = useSelector((state) => state.posts)
    const location = useLocation();
    const [categ, setCateg] = useState()

  
    useEffect(() => {
        if(location.state.category !== null){
            setCateg(location.state.category)
        } else {
            setCateg(null)
        }
    }, [])

    if(isLoading){
        return(
            <Spinner/>
        )
    }
    

    return (
        <div>
            <BackButton url={'/'}></BackButton>
            {postsSearch.length === 0 ? (
                <h1>No posts have been found, please try again</h1>
            ): (
                <>
                {categ ? <h1>All debates under the category: {categ}</h1> : null}
                    
                <div className="tickets">
                   
                    {postsSearch.map((post) => (
                        <PostItem key={post._id} post={post}/>
                    ))}
                </div>
                </>
            )}

        </div>
    )
}

export default SearchQuery
