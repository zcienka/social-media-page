import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export interface Comment {
    date: Date,
    id: string,
    user: string,
    username: string,
    description: string,
}

export interface PostList {

}

export interface SinglePostState {
    caption: string | null,
    comment: Comment[],
    date: string | null,
    id: string | null,
    image: string | null,
    total_likes: number | null,
    user: string | null,
    username: string | null,
    users_like: number[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const initialState: SinglePostState = {
    id: null,
    caption: null,
    comment: [],
    date: null,
    image: null,
    total_likes: null,
    user: null,
    username: null,
    users_like: [],
    loading: 'idle',
}

export const getPost = createAsyncThunk(
    'singlePost/getPost',
    async (id: string) => {
        const {data} = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
        return data
    }
)


export const singlePostSlice = createSlice({
    name: 'singlePost',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPost.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            const {caption, comment, date, id, image, total_likes, user, username, users_like} = action.payload
            state.caption = caption
            state.comment = comment
            state.date = date
            state.id = id
            state.image = image
            state.total_likes = total_likes
            state.user = user
            state.username = username
            state.users_like = users_like
            state.loading = 'succeeded'
        })
        builder.addCase(getPost.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})

export default singlePostSlice.reducer
