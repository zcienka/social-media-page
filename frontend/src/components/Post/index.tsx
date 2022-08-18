import {Wrapper, Photo} from './Post.styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React, {useEffect, useState} from 'react'
import {getPosts, PostList, updatePost} from '../../features/postsSlice'
import moment from 'moment'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {useNavigate} from "react-router-dom";
import {CommentState, getCommentsByPostId} from "../../features/commentSlice";
import {Comment} from "../../features/commentSlice"

interface userDetails {
    username: string,
    userId: number,
}

interface Props {
    post: PostList,
    comments: CommentState
}

function Post(props: PostList) {
    const userInfo: userDetails = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const [isPostLiked, setIsPostLiked] = useState(props.users_like.includes(userInfo.userId))
    const [showFullPost, setShowFullPost] = useState(false)
    const dateAdded = moment(props.date).fromNow()
    const [post, setPost] = useState<PostList>(props)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const comments = useAppSelector(state => state.comment)

    useEffect(() => {
        dispatch(getCommentsByPostId(props.id))
    }, [props.id, dispatch])

    console.log({comments})

    const likePost = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault()

        setPost((prevPost: PostList) => {
            return {...prevPost, users_like: [...prevPost.users_like, userInfo.userId]}
        })
    }

    const dislikePost = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault()
        setPost((prevPost: PostList) => {
            return {...prevPost, users_like: [...prevPost.users_like.filter((id) => id !== userInfo.userId)]}
        })
    }

    useEffect(() => {
        dispatch(updatePost(post))
    }, [post, dispatch])

    useEffect(() => {
        if (showFullPost) {
            navigate(`/post/${post.id}`, {replace: true})
        }
    }, [post.id, navigate, showFullPost])

    return <Wrapper>
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
            <div onClick={() => setIsPostLiked((likePost: boolean) => !likePost)}>
                {isPostLiked ? <FavoriteIcon className={'heart-container red'}
                                             onClick={(e) => dislikePost(e)}/> :
                    <FavoriteIcon className={'heart-container grey'}
                                  onClick={(e) => likePost(e)}/>}
            </div>

            <div className="comments">
                {comments.results.map((comment: Comment) => {
                    return <div className={'single-comment'}>
                        <p className={'username'}>{comment.username}</p>
                        <p className={'description'}>{comment.description}</p>
                    </div>
                })}
            </div>


        </div>
    </Wrapper>
}

export default Post
