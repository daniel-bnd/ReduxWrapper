import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '..'

interface Props {
  isOpen: boolean
  id: number
  title: string
  content: string
}

interface InitialStateProps {
  editPostModal: Props
}

const initialState: InitialStateProps = {
  editPostModal: {
    isOpen: false,
    id: null,
    title: null,
    content: null
  }
}

export const EditPostModal = createSlice({
  name: 'editPostModal',
  initialState,
  reducers: {
    openEditPostModal: (state, { payload }) => {
      state.editPostModal = {
        isOpen: true,
        id: payload.id,
        title: payload.title,
        content: payload.content
      }
    },
    closeEditPostModal: (state, { payload }) => {
      state.editPostModal = {
        isOpen: false,
        id: null,
        title: null,
        content: null
      }
    }
  },
  extraReducers: {
    /* [HYDRATE]: (state, { payload }) => {
      if (!payload.editPostModal) {
        return state
      }
      return state
    } */
  }
})

export const { openEditPostModal, closeEditPostModal } = EditPostModal.actions

export const selectEditPostModal = (state: AppState) => state

export default EditPostModal.reducer
