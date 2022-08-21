import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import {Credentials} from '../pages/LogInSignUp/LogIn'
import jwtDecode from 'jwt-decode'
import {UserAuth} from "../interfaces/profileLocalStorage.interface"

const initialState = {
    username: null,
    user_id: null,
    loading: 'idle',
} as UserAuth

export interface JWTToken {
    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: number,
    username: string,
}

export const authenticateUser = createAsyncThunk(
    'authenticate/authenticateUser',
    async (userInfo: Credentials) => {
            const {data} = await axios.post('http://127.0.0.1:8000/api/user/token/', userInfo)
            return data
    }
)

export const authSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        getUser(state) {
            const localStorageProfile = localStorage.getItem('profile')

            if(localStorageProfile !== null) {
                const jwtToken: JWTToken = jwtDecode(localStorageProfile)
                state.username = jwtToken.username
                state.user_id = jwtToken.user_id
            }
        }
    },
    // middleware: [authMiddleware],
    extraReducers: builder => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            const jwtToken: JWTToken = jwtDecode(action.payload.access)
            state.username = jwtToken.username
            state.user_id = jwtToken.user_id

            state.loading = 'succeeded'
        })
        builder.addCase(authenticateUser.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})

export default authSlice.reducer

export const {getUser} = authSlice.actions
