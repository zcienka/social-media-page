import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import {credentials} from '../pages/LogInSignUp/LogIn'

export interface Token {
    refresh: string,
    access: string,
}

interface TokenState {
    entities: Token[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    entities: [],
    loading: 'idle',
} as TokenState

export const authenticateUser = createAsyncThunk(
    'authenticate/authenticateUser',
    async (userInfo: credentials) => {
            const {data} = await axios.post('http://127.0.0.1:8000/api/token/', userInfo)
            return data
    }
)


// export const createAccount = createAsyncThunk(
//     'account/createAccount',
//     async (userInfo: credentials) => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/token/', userInfo)
//             return response.data
//         } catch (error) {
//             console.log(error)
//         }
//     }
// )

export const authSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        authenticateUser: (state, action: PayloadAction<Token>) => {
            state.entities.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.entities = action.payload
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            state.loading = 'succeeded'
        })
        builder.addCase(authenticateUser.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})

export default authSlice.reducer