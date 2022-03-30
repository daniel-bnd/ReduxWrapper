import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Action } from 'redux'
import profileReducer from './slices/profile'

const makeStore = () =>
  configureStore({
    reducer: { profile: profileReducer },
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

type Store = ReturnType<typeof makeStore>
export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>

export const wrapper = createWrapper<AppStore>(makeStore)
