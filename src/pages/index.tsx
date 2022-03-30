import axios from 'axios'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from '../redux/store'
import {
  openDeletePostModal,
  selectDeletePostModal
} from '../redux/store/slices/deletePostModal'
import {
  openEditPostModal,
  selectEditPostModal
} from '../redux/store/slices/editPostModal'
import { loginSuccess, selectLogin } from '../redux/store/slices/login'
import {
  addPost,
  editPost,
  selectPosts,
  setPostsData
} from '../redux/store/slices/posts'
import { Container } from '../styles/pages/Home'

const Home: React.FC = () => {
  const { posts } = useSelector(selectPosts).posts
  const { login } = useSelector(selectLogin).login
  const { deletePostModal } = useSelector(selectDeletePostModal).deletePostModal
  const { editPostModal } = useSelector(selectEditPostModal).editPostModal
  const dispatch = useDispatch()
  console.log()

  useEffect(() => {
    dispatch(openDeletePostModal(5)),
      dispatch(
        loginSuccess({
          username: 'Daniel',
          email: 'daniielreis@live.com'
        })
      ),
      dispatch(
        openEditPostModal({
          id: 56,
          title: 'Sexo',
          content: 'Sem parar'
        })
      )
    dispatch(
      addPost({
        id: 21,
        username: 'Sexo',
        created_at: new Date().toISOString(),
        title: 'Sexo sem parar',
        content: 'puta merda'
      })
    ),
      dispatch(editPost({ id: 1740, title: 'PUTA VADIA', content: 'GALINHA' }))
  }, [])

  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <h1>ReactJS Structure</h1>
      <p>Hello World!</p>
      <br />

      <button
        onClick={() => {
          dispatch(openDeletePostModal(5)),
            dispatch(
              loginSuccess({
                username: 'Daniel',
                email: 'daniielreis@live.com'
              })
            ),
            dispatch(
              openEditPostModal({
                id: 56,
                title: 'Sexo',
                content: 'Sem parar'
              })
            )
          dispatch(
            addPost({
              id: 21,
              username: 'Sexo',
              created_at: new Date().toISOString(),
              title: 'Sexo sem parar',
              content: 'puta merda'
            })
          ),
            dispatch(
              editPost({ id: 1740, title: 'PUTA VADIA', content: 'GALINHA' })
            )
        }}
      >
        XERECA
      </button>
      <p>login: {login.isAuth ? 'true' : 'false'}</p>
      <p>user: {login.user.username}</p>
      <p>email: {login.user.email}</p>
      <p>modal id: {deletePostModal.id}</p>
      <p>modal edit: {editPostModal.title}</p>
      {posts.map(p => (
        <div key={p.id}>
          {p.title} {p.id}
        </div>
      ))}
    </Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ctx => {
    await axios
      .get('http://localhost:3000/api/getAllPosts')
      .then(res => {
        store.dispatch(setPostsData(res.data))
      })
      .catch(console.log)

    return {
      props: {}
    }
  }
)

export default Home
