import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import {PostList} from "./postsSlice";

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
    'user/getUserInfo',
    async (username: string) => {
        const {data} = await axios.get(`http://127.0.0.1:8000/api/user/${username}/`)
        return data
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
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

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (username: string) => {
        await axios.delete(`http://127.0.0.1:8000/api/user/${username}/delete`)
    }
)

export const userSlice = createSlice({
    name: 'user',
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

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state = initialState
            localStorage.removeItem('currentUser')
            localStorage.removeItem('profile')
            state.loading = 'succeeded'
        })
        builder.addCase(deleteUser.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})

export default userSlice.reducer
