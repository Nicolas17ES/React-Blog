import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PostItem from '../components/PostItem'

function SearchQuery() {
    const {postsSearch, isLoading, isSuccess, isError} = useSelector((state) => state.posts)

    if(isLoading){
        return(
            <Spinner/>
        )
    }
    

    return (
        <div>
            <BackButton url={'/'}></BackButton>
            <h1>All your Blog Posts</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Username</div>
                    <div>Date</div>
                    <div>Title</div>
                    <div>Type</div>
                    <div>Body</div>
                </div>
                {postsSearch.map((post) => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </div>
    )
}

export default SearchQuery
