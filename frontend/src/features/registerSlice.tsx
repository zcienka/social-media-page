import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import {credentials} from '../pages/LogInSignUp/SignUp'

export interface User {
    username: string,
    posts_liked: string[],
}

interface UserState {
    entities: User[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    entities: [],
    loading: 'idle',
} as UserState

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userInfo: credentials) => {
        const {data} = await axios.post('http://127.0.0.1:8000/api/user/register/', userInfo)
        return data
    }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.entities = action.payload
            state.loading = 'succeeded'
        })
        builder.addCase(registerUser.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})

export default registerSlice.reducer
