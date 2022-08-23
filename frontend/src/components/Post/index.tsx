import {Wrapper, Photo, DeletePostPopup} from './Post.styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React, {useEffect, useRef, useState} from 'react'
import {PostList, updatePost, deletePost} from '../../features/postsSlice'
import moment from 'moment'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {useNavigate} from 'react-router-dom';
import {addComment, CommentSend, getCommentsByPostId} from '../../features/commentSlice'
import {Comment} from '../../features/commentSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import {PersistProfile, TokenAuth} from "../../interfaces/profileLocalStorage.interface";
import jwtDecode from "jwt-decode";
import {JWTToken} from "../../features/authSlice";

const commentInitialState = {
    username: null,
    description: null,
    post: null
}

function Post(props: PostList) {
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [showDeletePostPopup, setShowDeletePostPopup] = useState(false)
    const dateAdded = moment(props.date).fromNow()
    const [post, setPost] = useState<PostList>(props)
    const [user, setUser] = useState<JWTToken | null>(null)
    const [comment, setComment] = useState<CommentSend>(commentInitialState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const comments = useAppSelector(state => state.comment)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const authUser = useAppSelector(state => state.auth)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    useEffect(() => {
        dispatch(getCommentsByPostId(props.id))
    }, [props.id, dispatch])

    useEffect(() => {
        if (authUser.access === null) {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
            const token: TokenAuth = JSON.parse(profile.auth)
            if (token.access !== null) {
                setIsUserLoggedIn(() => true)
                const accessToken: JWTToken = jwtDecode(token.access)

                setUser(() => accessToken)
                setComment((prevState) => {
                    return {...prevState, username: accessToken.username}
                })
                setComment((prevState) => {
                    return {...prevState, post: props.id}
                })
            } else {
                setIsUserLoggedIn(() => false)
            }
        } else {
            const accessToken: JWTToken = jwtDecode(authUser.access)
            setIsUserLoggedIn(() => true)

            setUser(() => accessToken)
            setComment((prevState) => {
                return {...prevState, username: accessToken.username}
            })
            setComment((prevState) => {
                return {...prevState, post: props.id}
            })
        }
    }, [isUserLoggedIn, authUser.access, props.id, authUser])


    useEffect(() => {
        if (user !== null) {
            setIsPostLiked(props.users_like.includes(user.user_id))
        }
    }, [user, user?.user_id, props.users_like])

    const likePost = () => {
        if (user !== null) {
            if (user.username !== null) {
                setPost((prevPost: PostList) => {
                    return {...prevPost, users_like: [...prevPost.users_like, user.user_id as number]}
                })
            } else {
                navigate('/login', {replace: false})
            }
        }
    }

    const dislikePost = () => {
        if (user !== null) {
            if (user.username !== null) {
                setPost((prevPost: PostList) => {
                    return {...prevPost, users_like: [...prevPost.users_like.filter((id) => id !== user.user_id)]}
                })
            } else {
                navigate('/login', {replace: false})
            }
        }
    }

    const postComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (comment.description !== null) {
            dispatch(addComment(comment))
            setComment((prevState) => {
                return {...prevState, description: null}
            })
            if (inputRef.current !== null) {
                inputRef.current.value = ""
            }
        }
    }

    const deleteCurrentPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(deletePost(post.id))
        setShowDeletePostPopup((showPopup: boolean) => !showPopup)
    }

    useEffect(() => {
        dispatch(updatePost(post))
    }, [post, dispatch])

    return <Wrapper>
        {showDeletePostPopup ? <DeletePostPopup>
            <div className={'message'}>
                <p>Do you really want do delete this post?</p>
                <div className='buttons'>
                    <div className={'delete-btn'}>
                        <button onClick={(e) => deleteCurrentPost(e)}>Delete</button>
                    </div>
                    <div className={'cancel-btn'}>
                        <button onClick={() => setShowDeletePostPopup((showPopup: boolean) => !showPopup)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </DeletePostPopup> : ''}
        <div className={'container'}>
            <Photo>
                {props.image ?
                    <img src={'http://127.0.0.1:8000' + props.image} alt={''}/> : ''}
            </Photo>

            <div className={'post-info-container'}>
                <div className={'login-date-container'}>
                    <h2 className={'user'}>{props.username}</h2>
                    <h2 className={'date-added'}>{dateAdded}</h2>
                </div>
                <h2 className={'caption'}>{props.caption}</h2>
            </div>

            <div className='icons'>
                <div onClick={() => setIsPostLiked((likePost: boolean) => !likePost)}>
                    {isPostLiked ? <FavoriteIcon className={'heart-icon red'} onClick={() => dislikePost()}/> :
                        <FavoriteIcon className={'heart-icon grey'} onClick={() => likePost()}/>}
                </div>
                {user !== null && props.username === user.username ? <DeleteIcon className={'trash-icon'} onClick={() =>
                    setShowDeletePostPopup((showPopup: boolean) => !showPopup)}/> : ''}
            </div>
            <div className={'header'}>
                <p>Comments</p>
            </div>
            <div className='comments-show-recent'>
                {comments.results.map((comment: Comment) => {
                    if (comment.post === props.id) {
                        return <div className={'single-comment'} key={comment.id}>
                            <p className={'username'}>{comment.username}</p>
                            <p className={'description'}>{comment.description}</p>
                        </div>
                    }
                })}
            </div>
            {isUserLoggedIn ? <div className='comment-input'>
                <input placeholder={'Write a comment'} ref={inputRef} onChange={(e) =>
                    setComment((prevState) => {
                        return {...prevState, description: e.target.value}
                    })}/>
                <button onClick={(e) => postComment(e)}>Post</button>
            </div> : ''}
        </div>
    </Wrapper>
}

export default Post
