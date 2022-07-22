import {Wrapper} from './Posts.styles'
import {useEffect} from 'react'
import {getPosts} from '../../../features/postsSlice'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {PostsList} from '../../../features/postsSlice'
import Post from '../Post'

function Posts() {
    const posts = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    console.log({posts})

    return <Wrapper>
        {posts.entities.map((post: PostsList) => (
            <Post {...post} key={post.id}/>
        ))}
    </Wrapper>
}

export default Posts
