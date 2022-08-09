import {configureStore} from '@reduxjs/toolkit'
import postsReducer from "../features/postsSlice"
import authReducer from "../features/authSlice"
import userReducer from "../features/userSlice"

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        user: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store