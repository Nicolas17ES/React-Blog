import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import {useState, useEffect} from 'react'


function ShareLinks({hash, title}) {
    const [url, setUrl] = useState('');
    const [hashtag, setHashtag] = useState('');
    const [quotes, setQuotes] = useState('');

    useEffect(() => {
        setUrl('http://localhost:3000' + window.location.pathname);
        setHashtag(hash)
        setQuotes(title)
        
    }, [])
    console.log(title)


    return (
        <>
            <p>Share</p>
            <FacebookShareButton
                url={url}
                quotes={quotes}
                hashtag={hashtag} 
            >
                <FacebookIcon size={30} />
            </FacebookShareButton>
            <TwitterShareButton
                url={url}
                quotes={quotes}
                hashtag={hashtag} 
            >
                <TwitterIcon size={30} />
            </TwitterShareButton>
        </>
    )
}

export default ShareLinks
