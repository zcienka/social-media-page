import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import {Credentials} from '../pages/LogInSignUp/LogIn'
import jwtDecode from 'jwt-decode'
import {PersistProfile, TokenAuth} from "../interfaces/profileLocalStorage.interface"

const initialState = {
    refresh: null,
    access: null,
    loading: 'idle',
} as TokenAuth

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

export const refreshToken = createAsyncThunk(
    'authenticate/refreshToken',
    async () => {
        const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
        const token: TokenAuth = JSON.parse(profile.auth)
        const {data} = await axios.post('http://127.0.0.1:8000/api/user/token/refresh/', {refresh: token.refresh})
        return data
    }
)

export const authSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        logOut: () => initialState
    },
    extraReducers: builder => {
        builder.addCase(authenticateUser.pending, (state) => {
            return {...state,
                loading: 'pending'
            }
        })
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
                return {...state,
                    access: action.payload.access,
                    refresh: action.payload.refresh,
                    loading: 'succeeded'
                }
            }
        )
        builder.addCase(authenticateUser.rejected, (state) => {
            return {...state,
                loading: 'failed'
            }
        })

        builder.addCase(refreshToken.pending, (state) => {
            return {...state,
                loading: 'pending'
            }
        })
        builder.addCase(refreshToken.fulfilled, (state, action) => {
                return {...state,
                    access: action.payload.access,
                    refresh: action.payload.refresh,
                    loading: 'succeeded'
                }
            }
        )
        builder.addCase(refreshToken.rejected, (state) => {
            return {...state,
                loading: 'failed'
            }
        })
    }
})

export default authSlice.reducer
export const {logOut} = authSlice.actions