import {Wrapper} from './PublishPost.styles'
import React, {useState, useEffect} from 'react'
import {addPost, PostList} from '../../features/postsSlice'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {useNavigate} from "react-router-dom"
import {PersistProfile, TokenAuth} from "../../interfaces/profileLocalStorage.interface";
import {JWTToken} from "../../features/authSlice";
import jwtDecode from "jwt-decode";

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

function PublishPost(file: Props) {
    const dispatch = useAppDispatch()
    const [showPopup, setShowPopup] = useState(true)
    const [post, setPost] = useState<PostList>(initialState)
    const navigate = useNavigate()
    const authUser = useAppSelector(state => state.auth)

    const publishPost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (post.caption !== null && post.username !== null) {
            setPost((post: PostList) => {
                return {...post, image: file.image}
            })
            dispatch(addPost(post))
            navigate('/', {replace: false})
        }
    }

    useEffect(() => {
        setShowPopup(true)
        setPost(() => initialState)
    }, [file])

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
        if (localStorage.getItem("persist:profile") !== null) {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
            const token: TokenAuth = JSON.parse(profile.auth)

            if (token.access !== null) {
                const accessToken: JWTToken = jwtDecode(token.access)
                if (accessToken.username === null || accessToken.user_id === null) {
                    navigate('/login', {replace: false})
                } else {
                    setPost((post: PostList) => {
                        return {...post, username: accessToken.username}
                    })
                    setPost((post: PostList) => {
                        return {...post, image: file.image}
                    })
                }
            }
        }
    }, [authUser, file.image, navigate])


    return showPopup ? <Wrapper>
        <div className='popup-window'>
            <div className={'image-container'}>
                <img src={file.image} alt={''} className='image'/>
            </div>
            <div className='description-container'>

                <p className={'post-description'}>Add description to your post</p>
                <textarea onChange={(e) => handleChange(e)}/>
                <div className='publish-btn-container'>
                    <button className={'publish-btn'} onClick={(e) => publishPost(e)}>Publish</button>
                </div>
            </div>
        </div>
    </Wrapper> : <></>
}

export default PublishPost
