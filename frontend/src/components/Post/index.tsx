import {Wrapper, Photo, DeletePostPopup} from './Post.styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React, {useEffect, useState} from 'react'
import {PostList, updatePost, deletePost} from '../../features/postsSlice'
import moment from 'moment'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {useNavigate} from 'react-router-dom';
import {addComment, CommentSend, getCommentsByPostId} from '../../features/commentSlice'
import {Comment} from '../../features/commentSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import {PersistProfile, UserAuth} from "../../interfaces/profileLocalStorage.interface";

const commentInitialState = {
    username: null,
    description: null,
    post: null
}

function Post(props: PostList) {
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [showDeletePostPopup, setShowDeletePostPopup] = useState(false)
    const [showFullPost, setShowFullPost] = useState(false)
    const dateAdded = moment(props.date).fromNow()
    const [post, setPost] = useState<PostList>(props)
    const [user, setUser] = useState<UserAuth | null>(null)
    const [comment, setComment] = useState<CommentSend>(commentInitialState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const comments = useAppSelector(state => state.comment)

    useEffect(() => {
        dispatch(getCommentsByPostId(props.id))
    }, [props.id, dispatch])

    useEffect(() => {
        if (localStorage.getItem("persist:profile") !== null) {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
            setUser(() => profile.auth)
            setComment((prevState) => {
                return {...prevState, username: profile.auth.username}
            })
            setComment((prevState) => {
                return {...prevState, post: props.id}
            })
        }
    }, [props.id])

    useEffect(() => {
        if (user !== null && typeof user.user_id === "number") {
            setIsPostLiked(props.users_like.includes(user.user_id))
        }
    }, [user, props.users_like])

    const likePost = () => {
        if (user !== null) {
            setPost((prevPost: PostList) => {
                return {...prevPost, users_like: [...prevPost.users_like, user.user_id as number]}
            })
        }
    }

    const dislikePost = () => {
        if (user !== null) {
            setPost((prevPost: PostList) => {
                return {...prevPost, users_like: [...prevPost.users_like.filter((id) => id !== user.user_id)]}
            })
        }
    }

    const postComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (comment.description !== null) {
            dispatch(addComment(comment))
        }
    }

    useEffect(() => {
        dispatch(updatePost(post))
    }, [post, dispatch])

    useEffect(() => {
        if (showFullPost) {
            navigate(`/post/${post.id}`, {replace: false})
        }
    }, [post.id, navigate, showFullPost])

    return <Wrapper>
        {showDeletePostPopup ? <DeletePostPopup>
            <div className={'message'}>
                <p>Do you really want do delete this post?</p>
                <div className='buttons'>
                    <div className={'delete-btn'}>
                        <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
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
                    <img src={'http://127.0.0.1:8000' + props.image} alt={''}
                         onClick={() => setShowFullPost((showFullPost: boolean) => !showFullPost)}/> : ''}
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
            <div className='comments'>
                {comments.results.map((comment: Comment) => {
                    if (comment.post === props.id) {
                        return <div className={'single-comment'} key={comment.id}>
                            <p className={'username'}>{comment.username}</p>
                            <p className={'description'}>{comment.description}</p>
                        </div>
                    }
                })}
            </div>
            <div className='comment-input'>
                <input placeholder={'Write a comment'} onChange={(e) =>
                    setComment((prevState) => {
                        return {...prevState, description: e.target.value}
                    })}/>
                <button onClick={(e) => postComment(e)}>Post</button>
            </div>
        </div>
    </Wrapper>
}

export default Post
