import {Wrapper} from './UploadPost.styles'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import {addPost, getPosts} from '../../features/postsSlice'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import File from 'react-dropzone'
import CloseIcon from '@mui/icons-material/Close'
import PostList from '../../features/postsSlice'
import {useNavigate} from "react-router-dom";
import {getUserInfo} from "../../features/userSlice";

interface Props {
    image: string,
    alt: string,
}

export interface PostAdd {
    caption: string | null,
    image: string | null,
    username: string | null,
    comment: any[] ,
    users_like: any[]
}

const initialState = {
    caption: null,
    image: null,
    username: null,
    comment: [],
    users_like: [],
}

function UploadPost(file: Props) {
    const dispatch = useAppDispatch()
    const [showPopup, setShowPopup] = useState(true)
    const [post, setPost] = useState<PostAdd>(initialState)
    const navigate = useNavigate()

    const publishPost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (post.caption !== null && post.image !== null && post.username !== null) {
                setPost((post: PostAdd) => {
                    return {...post, image: file.image}
                })
            dispatch(addPost(post))
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.value === '') {
            setPost((post: PostAdd) => {
                return {...post, caption: null}
            })
        } else {
            setPost((post: PostAdd) => {
                return {...post, caption: e.target.value}
            })
        }
        setPost((post: PostAdd) => {
            return {...post, image: file.image}
        })
    }

    useEffect(() => {
        if (localStorage.getItem('currentUser') === null) {
            navigate('/login', {replace: true})
        } else {
            const currentUser: string = JSON.parse(localStorage.getItem('currentUser') || '{}')
            setPost((post: PostAdd) => {
                return {...post, username: currentUser}
            })
            setPost((post: PostAdd) => {
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
