import React, {useEffect} from 'react'
import {Wrapper} from "./FullPost.styles"
import {getPost} from "../../features/postsSlice"
import {useParams} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {Photo} from '../Post/Post.styles'
import Post from "../Post"
import {PostList} from "../../features/postsSlice"

function FullPost() {
    const {id} = useParams()
    // const comment = useAppSelector(state => state.comment)
    const dispatch = useAppDispatch()
    const post = useAppSelector(state => state.posts)

// console.log(post.results[0])
    useEffect(() => {
        if (id != null) {
            dispatch(getPost(id))
        }
    }, [id, dispatch])
    // console.log({post})

    return <>
        {/*{post.results.map((xd: PostList) => {*/}
        {/*        return <Post {...xd} key={xd.id}/>*/}
        {/*    })}*/}
    </>
}

export default FullPost
