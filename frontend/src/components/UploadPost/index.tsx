import {Wrapper} from './UploadPost.styles'
import React, {useState, useEffect} from 'react'
import {addPost, PostList} from '../../features/postsSlice'
import {useAppDispatch} from '../../app/hooks'
import CloseIcon from '@mui/icons-material/Close'
import {useNavigate} from "react-router-dom"

interface Props {
    image: string,
    alt: string,
}

export const initialState = {
    caption: null,
    comments: [],
    date: null,
    id: null,
    image: null,
    total_likes: null,
    user: null,
    username: null,
    users_like: [],
}

export interface UserDetails {
    username: string,
    userId: string,
}

function UploadPost(file: Props) {
    const dispatch = useAppDispatch()
    const [showPopup, setShowPopup] = useState(true)
    const [post, setPost] = useState<PostList>(initialState)
    const navigate = useNavigate()

    const publishPost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (post.caption !== null && post.image !== null && post.username !== null) {
            setPost((post: PostList) => {
                return {...post, image: file.image}
            })
            dispatch(addPost(post))
            setShowPopup(!showPopup)
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.value === '') {
            setPost((post: PostList) => {
                return {...post, caption: null}
            })
        } else {
            setPost((post: PostList) => {
                return {...post, caption: e.target.value}
            })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('currentUser') === null) {
            navigate('/login', {replace: false})
        } else {
            const currentUser: UserDetails = JSON.parse(localStorage.getItem('currentUser') || '{}')
            setPost((post: PostList) => {
                return {...post, username: currentUser.username}
            })
            setPost((post: PostList) => {
                return {...post, image: file.image}
            })
        }
    }, [file.image, navigate])


    return showPopup ? <Wrapper>
        <div className='popup-window'>
            <div className={'image-container'}>
                <img src={file.image} alt={''} className='image'/>
            </div>
            <div className='description-container'>
                <div className={'close-icon'}>
                    <CloseIcon onClick={() => setShowPopup(!showPopup)}/>
                </div>

                <p className={'post-description'}>Add description to your post</p>
                <textarea onChange={(e) => handleChange(e)}/>
                <div className='publish-btn-container'>
                    <button className={'publish-btn'} onClick={(e) => publishPost(e)}>Publish</button>
                </div>
            </div>
        </div>
    </Wrapper> : <></>
}

export default UploadPost
