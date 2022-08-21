import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import postsReducer from "../features/postsSlice"
import authReducer from "../features/authSlice"
import registerReducer from "../features/registerSlice"
import userReducer from "../features/userSlice"
import commentReducer from "../features/commentSlice"

export const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    register: registerReducer,
    user: userReducer,
    comment: commentReducer,
});

const configStorage = {
    key: 'profile',
    storage,
    whitelist: ['auth']
};

export default persistReducer(configStorage, rootReducer)