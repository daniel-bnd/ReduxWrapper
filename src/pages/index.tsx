import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
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

const Home: React.FC = (props: any) => {
  const { posts } = useSelector(selectPosts).posts
  const { login } = useSelector(selectLogin).login
  const { deletePostModal } = useSelector(selectDeletePostModal).deletePostModal
  const { editPostModal } = useSelector(selectEditPostModal).editPostModal
  const dispatch = useDispatch()
  //console.log(props.login.isAuth)

  async function handleLogin() {
    await axios
      .post('http://localhost:3000/api/signInRequest', {
        username: 'Daniel',
        email: 'daniielreis@live.com'
      })
      .then(res => {
        dispatch(
          loginSuccess({
            username: 'Daniel',
            email: 'daniielreis@live.com'
          })
        )
      })
      .catch(console.log)
  }

  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <Link href="/cookies">Cookies</Link>

      <h1>ReactJS Structure</h1>
      <p>Hello World!</p>
      <br />

      <button onClick={() => handleLogin()}>Login</button>
      <br />

      <button
        onClick={() => {
          dispatch(openDeletePostModal(5)),
            dispatch(
              openEditPostModal({
                id: 56,
                title: 'Conteúdo editado',
                content: 'Teste'
              })
            ),
            dispatch(
              addPost({
                id: 21,
                username: 'user',
                created_at: new Date().toISOString(),
                title: 'User',
                content: "I'm a user"
              })
            ),
            dispatch(
              editPost({ id: 1740, title: 'PUTA VADIA', content: 'GALINHA' })
            )
        }}
      >
        CONFIGS
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
