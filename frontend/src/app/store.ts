import {configureStore} from '@reduxjs/toolkit'
import postsReducer from "../features/postsSlice"
import authReducer from "../features/authSlice"

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        account: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store