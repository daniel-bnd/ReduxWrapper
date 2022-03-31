import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '..'

const initialState = null

export const CookiesSlice = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    setCookies: state => {
      return
    },
    recoveryCookies: state => {
      return
    }
  },
  extraReducers: {
    /* [HYDRATE]: (state, { payload }) => {
      if (!payload.cookies) {
        return state
      }
      state = payload
      console.log(state)
    } */
  }
})

export const { setCookies, recoveryCookies } = CookiesSlice.actions

export const selectCookies = (state: AppState) => state

export default CookiesSlice.reducer
