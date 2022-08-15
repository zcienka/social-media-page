import React, {useEffect, useState, useRef, useCallback} from 'react'
import {getPosts, PostList} from '../../../features/postsSlice'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import Post from '../Post'

function Posts() {
    const [url, setUrl] = useState<string | null>('http://127.0.0.1:8000/api/posts/')
    const posts = useAppSelector(state => state.posts)
    const [hasMore, setHasMore] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPosts(url))
    }, [url, dispatch])

    const lastBookElementRef = useCallback((node: any) => {
        if (posts.next !== null) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }

        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setUrl(posts.next)
            }
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [posts.next, hasMore])
    const observer = useRef<IntersectionObserver | null>(null)

    return <>
        {posts.results.map((post: PostList, index: number) => {
            if (posts.results.length === index + 1) {
            return <span ref={lastBookElementRef} key={post.id}> <Post {...post} /></span>
        } else {
            return <Post {...post} key={post.id}/>
        }
        })}
    </>
}

export default Posts
