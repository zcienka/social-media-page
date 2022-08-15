import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {PostAdd} from '../components/UploadPost'

export interface UsersLike {
    username: string,
}

export interface Comment {
    date: Date,
    id: string,
    user: string,
    username: string,
    description: string,
}

export interface PostList {
    caption: string,
    comment: Comment[],
    date: string,
    id: string,
    image: string,
    total_likes: number,
    user: string,
    username: string,
    users_like: UsersLike[],
}

export interface PostState {
    results: PostList[],
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

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (post: PostAdd) => {
        console.log({post})
        const {data} = await axios.post('http://127.0.0.1:8000/api/posts/', post)
        console.log(data)
        return data
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // addPost: (state, {payload}: PayloadAction<ApiList<PostList>>) => {
        //     const {results, previous, next, count} = payload
        //     state.results = results
        //     state.previous = previous
        //     state.next = next
        //     state.count = count
        // },
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
