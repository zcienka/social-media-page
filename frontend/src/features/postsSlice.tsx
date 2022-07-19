import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'

export interface PostsList {
    id: number,
    body: string,
    value: number,
}

interface PostsState {
    entities: PostsList[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    entities: [],
    loading: 'idle',
} as PostsState

export const getPosts = createAsyncThunk(
    'users/getUsers',
    async () => {
        return await fetch('http://127.0.0.1:8000/api/posts/').then(
            (res) => res.json()
        )
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<PostsList>) => {
            state.entities.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading  = 'pending'
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.entities = action.payload
            state.loading = 'succeeded'
        })
        builder.addCase(getPosts.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})

export default postsSlice.reducer
