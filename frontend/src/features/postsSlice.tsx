import {createSlice, PayloadAction, createAsyncThunk, createAction} from '@reduxjs/toolkit'

export interface PostListResponse {
    id: string,
    caption: string,
    date: string,
    username: string,
    image: string,
}

export interface PostState {
    results: PostListResponse[],
    count: number
    next: string | null
    previous: string | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const initialState: PostState = {
    results: [],
    count: 0,
    next: null,
    previous: null,
    loading: 'idle',
}

export type ApiList<TypeGeneric> = {
    count: number
    next: string | null
    previous: string | null
    results: TypeGeneric[]
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (url: string | null) => {
        if (url !== null) {
            return await fetch(url).then(
                (res) => res.json()
            )
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, {payload}: PayloadAction<ApiList<PostListResponse>>) => {
            const {results, previous, next, count} = payload
            state.results = results
            state.previous = previous
            state.next = next
            state.count = count
        },
    },
    extraReducers: builder => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            const {results, previous, next, count} = action.payload
            state.results.push(...results)
            state.results = (Array.from(new Map(state.results.map((x) => [x['id'], x])).values()))

            state.previous = previous
            state.next = next
            state.count = count
            state.loading = 'succeeded'
        })
        builder.addCase(getPosts.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})

export default postsSlice.reducer
