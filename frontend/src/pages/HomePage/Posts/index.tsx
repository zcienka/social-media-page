import {Wrapper} from './Posts.styles'
import {useEffect} from 'react'
import {getPosts, PostListResponse} from '../../../features/postsSlice'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import Post from '../Post'

function Posts() {
    const posts = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return <Wrapper>
        {posts.results.map((post: PostListResponse) => (
            <Post {...post} key={post.id}/>
        ))}
    </Wrapper>
}

export default Posts
