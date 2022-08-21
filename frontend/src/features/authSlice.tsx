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
    exp: number,
    iat: number,
    jti: string,
    token_type: string,
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
//&& localStorage.removeItem('persist:profile')
//&& localStorage.removeItem('persist:profile')
export const authSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        logOut: () => initialState
    },
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
export const {logOut} = authSlice.actions