import {Wrapper} from './Posts.styles'
import {useEffect} from 'react'
import {getPosts} from '../../../features/postsSlice'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {PostsList} from '../../../features/postsSlice'

function Posts() {
    const posts = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return <Wrapper>
        {posts.entities.map((post: PostsList) => (
            <h2>{post.body}</h2>
        ))}
    </Wrapper>
}

export default Posts
