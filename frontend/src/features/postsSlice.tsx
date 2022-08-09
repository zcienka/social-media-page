import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'

export interface PostListResponse {
    id: string,
    caption: string,
    date: string,
    username: string,
    image: string,
}

export interface PostState {
    results: PostListResponse[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const initialState: PostState = {
    results: [],
    loading: 'idle',
}

export type ApiList<TypeGeneric> = {
    count: number
    next: string
    previous: string
    results: TypeGeneric[]
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
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
        addPost: (state, {payload}: PayloadAction<ApiList<PostListResponse>>) => {
            const { results } = payload
            state.results.push(...results)
        },
    },
    extraReducers: builder => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            const { results } = action.payload
            state.results.push(...results)
            state.loading = 'succeeded'
        })
        builder.addCase(getPosts.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})

export default postsSlice.reducer
