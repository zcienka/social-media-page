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
    const dispatch = useAppDispatch()
    const post = useAppSelector(state => state.posts)

    useEffect(() => {
        if (id != null) {
            dispatch(getPost(id))
        }
    }, [id, dispatch])

    return <>
        {/*{post.results.map((xd: PostList) => {*/}
        {/*        return <Post {...xd} key={xd.id}/>*/}
        {/*    })}*/}
    </>
}

export default FullPost
