import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export interface PostList {
    caption: string | null,
    comments: string[],
    date: string | null,
    id: string | null,
    image: string | null,
    total_likes: number | null,
    user: string | null,
    username: string | null,
    users_like: number[],
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

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (url: string | null = 'http://127.0.0.1:8000') => {
        if (url !== null) {
            return await fetch(url).then(
                (res) => res.json()
            )
        }
    }
)

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (post: PostList) => {
        const {data} = await axios.post('http://127.0.0.1:8000/api/posts/', {
            caption: post.caption,
            comments: post.comments,
            image: post.image,
            username: post.username,
            users_like: post.users_like,
        })
        return data
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (post: PostList) => {
        const {data} = await axios.put('http://127.0.0.1:8000/api/posts/' + post.id + '/update/', post)
        return data
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id: string | null) => {
        if (id !== null) {
            await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`)
            return id
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            const {results, previous, next, count} = action.payload
            state.results.push(...results)
            state.results = Array.from(new Map(state.results.map((x) => [x['id'], x])).values())

            state.previous = previous
            state.next = next
            state.count = count
            state.loading = 'succeeded'
        })
        builder.addCase(getPosts.rejected, (state) => {
            state.loading = 'failed'
        })

        builder.addCase(addPost.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.results.unshift(action.payload)
            state.loading = 'succeeded'
        })
        builder.addCase(addPost.rejected, (state) => {
            state.loading = 'failed'
        })

        builder.addCase(updatePost.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const {results} = action.payload
            state.results = state.results.map((post) => post.id === results ? results : post)
            state.loading = 'succeeded'
        })
        builder.addCase(updatePost.rejected, (state) => {
            state.loading = 'failed'
        })

        builder.addCase(deletePost.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.results = state.results.filter((post: PostList) => post.id !== action.payload)
            state.loading = 'succeeded'
        })
        builder.addCase(deletePost.rejected, (state) => {
            state.loading = 'failed'
        })
    },
})

export default postsSlice.reducer

