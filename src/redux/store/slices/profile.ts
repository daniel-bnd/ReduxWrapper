import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '..'

interface Props {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

interface initialStateProps {
  profile: Props[]
}

const initialState: initialStateProps = null

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, { payload }) => {
      return payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      if (!payload.profile) {
        return state
      }
      return payload
    }
  }
})

export const { setProfileData } = ProfileSlice.actions

export const selectProfile = (state: AppState) => state.profile

export default ProfileSlice.reducer
