import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '..'

export type Props = {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

interface initialStateProps {
  posts: Props[]
}

const initialState: initialStateProps = null

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsData: (state, { payload }) => {
      return payload
    },
    addPost: (state, { payload }) => {
      state.posts.unshift(payload)
    },
    deletePost(state, { payload }) {
      state.posts = state.posts.filter(post => post.id !== payload)
    },
    editPost(state, { payload }) {
      state.posts.map(post => {
        if (post.id === payload.id) {
          post.title = payload.title
          post.content = payload.content
        }
      })
    }
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      if (!payload.posts) {
        return state
      }
      return payload
    }
  }
})

export const { setPostsData, addPost, deletePost, editPost } =
  PostsSlice.actions

export const selectPosts = (state: AppState) => state

export default PostsSlice.reducer
