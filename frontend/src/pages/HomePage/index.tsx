import Posts from '../../components/Posts'
import React, {useEffect} from 'react'
import {getPosts} from "../../features/postsSlice";
import {useAppDispatch} from "../../app/hooks";

function HomePage() {
    const dispatch = useAppDispatch()


    return <>
        <Posts/>
    </>
}

export default HomePage
