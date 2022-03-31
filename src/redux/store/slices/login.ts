import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '..'

interface User {
  username: string
  email: string
}

export interface LoginProps {
  isLoading: boolean
  isAuth: boolean
  error: string
  user: User
}

interface InitialStateProps {
  login: LoginProps
}

const initialState: InitialStateProps = {
  login: {
    isLoading: false,
    isAuth: false,
    error: '',
    user: {
      username: null,
      email: null
    }
  }
}

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginPending: state => {
      state.login.isLoading = true
    },
    loginSuccess: (state, { payload }) => {
      state.login.isLoading = false
      state.login.isAuth = true
      state.login.error = ''
      state.login.user = payload
    },
    loginFail: (state, { payload }) => {
      state.login.isLoading = false
      state.login.error = payload
    },
    signOut: state => {
      state.login.isLoading = false
      state.login.isAuth = false
      state.login.error = ''
      state.login.user = { username: null, email: null }
    }
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      if (!payload.login) {
        return state
      }
      state = payload
    }
  }
})

export const { loginPending, loginSuccess, loginFail, signOut } =
  LoginSlice.actions

export const selectLogin = (state: AppState) => state

export default LoginSlice.reducer
