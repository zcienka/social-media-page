import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import {credentials} from '../pages/LogInSignUp/SignUp'

export interface User {
    user: number,
    slug: string,
    id: number,
}

interface UserState {
    user: number | null,
    slug: string | null,
    id: number | null,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    user: null,
    slug: null,
    id: null,
    loading: 'idle',
} as UserState

export const getUserInfo = createAsyncThunk(
    'getInfo/getUserInfo',
    async (username: string) => {
        const {data} = await axios.get(`http://127.0.0.1:8000/api/user/${username}/`)
        console.log({data})
        return data
    }
)

export const userSlice = createSlice({
    name: 'getInfo',
    initialState,
    reducers: {
        // ads: (state, action: PayloadAction<User>) => {
        //     state.entities.push(action.payload)
        // },
    },
    extraReducers: builder => {
        builder.addCase(getUserInfo.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            const {user, slug, id} = action.payload
            state.user = user
            state.slug = slug
            state.id = id
            state.loading = 'succeeded'
        })
        builder.addCase(getUserInfo.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})

export default userSlice.reducer
