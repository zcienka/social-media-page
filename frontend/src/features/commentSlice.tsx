import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export interface CommentSend {
    username: string | null,
    description: string | null,
    post: string | null,
}

export interface Comment {
    date: string | null,
    id: string | null,
    user: string | null,
    username: string | null,
    description: string | null,
    post: string | null,
}

export interface CommentState {
    results: Comment[],
    count: number
    next: string | null
    previous: string | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const initialState: CommentState = {
    results: [],
    count: 0,
    next: null,
    previous: null,
    loading: 'idle',
}

export const addComment = createAsyncThunk(
    'comment/addComment',
    async (comment: CommentSend) => {
            const {data} = await axios.post('http://127.0.0.1:8000/api/posts/comments/', comment)
        return data
    }
)

export const getCommentsByPostId = createAsyncThunk(
    'comment/getCommentsByPostId',
    async (postId: string | null) => {
        if (postId !== null) {
            const {data} = await axios.get(`http://127.0.0.1:8000/api/posts/${postId}/comments/`)
            return data
        }
    }
)

export const commentsSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addComment.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.results.unshift(action.payload)
            state.loading = 'succeeded'
        })
        builder.addCase(addComment.rejected, (state) => {
            state.loading = 'failed'
        })

        builder.addCase(getCommentsByPostId.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getCommentsByPostId.fulfilled, (state, action) => {
            const {results, previous, next, count} = action.payload
            state.results.push(...results)
            state.results = Array.from(new Map(state.results.map((x) => [x['id'], x])).values())

            state.previous = previous
            state.next = next
            state.count = count
            state.loading = 'succeeded'
        })
        builder.addCase(getCommentsByPostId.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})

export default commentsSlice.reducer
