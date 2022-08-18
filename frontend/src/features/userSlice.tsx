import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import {credentials} from '../pages/LogInSignUp/SignUp'
import {updatePost} from "./postsSlice"

// export interface PostsLiked {
//     username: string,
// }
//
// export interface User {
//     id: number,
//     posts_liked: PostsLiked[]
//     slug: string,
//     user: number,
//     username: string,
// }
//    id: null,
//     posts_liked: [],
//     slug: null,
//     username: null,
export interface User {
    id: number | null,
    posts_liked: any[]
    slug: string | null,
    username: string | null,
}

export interface UserState {
    id: number | null,
    posts_liked: any[]
    slug: string | null,
    username: string | null,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    id: null,
    posts_liked: [],
    slug: null,
    username: null,
    loading: 'idle',
} as UserState

export const getUserInfo = createAsyncThunk(
    'getInfo/getUserInfo',
    async (username: string) => {
        const {data} = await axios.get(`http://127.0.0.1:8000/api/user/${username}/`)
        // console.log({data})
        return data
    }
)

export const updateUser = createAsyncThunk(
    'getInfo/updateUser',
    async (user: UserState) => {
        const {data} = await axios.post(`http://127.0.0.1:8000/api/user/${user.username}/`, {
            id: user.id,
            posts_liked: user.posts_liked,
            slug: user.slug,
            username: user.username,
        })

        return data
    }
)

export const userSlice = createSlice({
    name: 'getInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUserInfo.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            const {id, slug, posts_liked, username} = action.payload
            state.id = id
            state.posts_liked = posts_liked
            state.slug = slug
            state.username = username
            state.loading = 'succeeded'
        })
        builder.addCase(getUserInfo.rejected, (state) => {
            state.loading = 'failed'
        })

        builder.addCase(updateUser.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            const {id, slug, posts_liked, username} = action.payload
            state.id = id
            state.posts_liked = posts_liked
            state.slug = slug
            state.username = username
            state.loading = 'succeeded'
        })
        builder.addCase(updateUser.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})

export default userSlice.reducer
