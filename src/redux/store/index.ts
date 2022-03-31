import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Action } from 'redux'
import cookiesReducer from './slices/cookies'
import deletePostModalReducer from './slices/deletePostModal'
import editPostModalReducer from './slices/editPostModal'
import loginReducer from './slices/login'
import postsReducer from './slices/posts'

const makeStore = () =>
  configureStore({
    reducer: {
      posts: postsReducer,
      login: loginReducer,
      cookies: cookiesReducer,
      deletePostModal: deletePostModalReducer,
      editPostModal: editPostModalReducer
    },
    devTools: true
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
