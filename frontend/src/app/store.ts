import {configureStore} from '@reduxjs/toolkit'
import postsReducer from "../features/postsSlice"
import authReducer from "../features/authSlice"
import registerReducer from "../features/registerSlice"
import userReducer from "../features/userSlice"
import singlePostReducer from "../features/singlePostSlice"
import commentReducer from "../features/commentSlice"

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        register: registerReducer,
        user: userReducer,
        // singlePost: singlePostReducer,
        comment: commentReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store