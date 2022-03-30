import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '..'

interface Props {
  isOpen: boolean
  id: number
}

interface InitialStateProps {
  deletePostModal: Props
}

const initialState: InitialStateProps = {
  deletePostModal: {
    isOpen: false,
    id: null
  }
}

export const DeletePostModal = createSlice({
  name: 'deletePostModal',
  initialState,
  reducers: {
    openDeletePostModal: (state, { payload }) => {
      state.deletePostModal = { isOpen: true, id: payload }
    },
    closeDeletePostModal: (state, { payload }) => {
      state.deletePostModal = { isOpen: payload, id: null }
    }
  },
  extraReducers: {
    /* [HYDRATE]: (state, { payload }) => {
      if (!payload.deletePostModal) {
        return state
      }
      return state
    } */
  }
})

export const { openDeletePostModal, closeDeletePostModal } =
  DeletePostModal.actions

export const selectDeletePostModal = (state: AppState) => state

export default DeletePostModal.reducer
