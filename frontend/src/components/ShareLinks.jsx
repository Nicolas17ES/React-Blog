import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import {useState, useEffect} from 'react'
import '../pages/SinglePost.css'
import {GrFacebookOption} from 'react-icons/gr'
import {AiOutlineTwitter} from 'react-icons/ai'


function ShareLinks({hash, title}) {
    const [url, setUrl] = useState('');
    const [hashtag, setHashtag] = useState('');
    const [quotes, setQuotes] = useState('');

    useEffect(() => {
        setUrl('http://localhost:3000' + window.location.pathname);
        setHashtag(hash)
        setQuotes(title)
        
    }, [])


    return (
        <div className="post-shares">
            <h4 className="likes-title">DO YOU WANNA SHARE THIS DEBATE</h4>
            <div className="buttons-shares">
                <FacebookShareButton
                url={url}
                quotes={quotes}
                hashtag={hashtag}
                >
                    <button className="post-like-button"><GrFacebookOption size={23}/></button>
                    {/* <FacebookIcon size={30} /> */}
                </FacebookShareButton>
                <TwitterShareButton
                    url={url}
                    quotes={quotes}
                    hashtag={hashtag} 
                >
                    <button className="post-like-button"><AiOutlineTwitter size={23}/></button>
                </TwitterShareButton>
            </div>
            <div className="facebook-twitter">
                <span className="total-likes-text">{'(' + 'on FaceBook' + ')'}</span>
                <span className="total-likes-text">{'(' + 'or Twitter' + ')'}</span>
            </div>
            
        </div>
    )
}

export default ShareLinks
