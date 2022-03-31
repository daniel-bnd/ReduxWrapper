import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from '../redux/store'
import { loginSuccess, selectLogin, signOut } from '../redux/store/slices/login'
import { Container } from '../styles/pages/Home'

const Cookies: React.FC = (props: any) => {
  const dispatch = useDispatch()
  const { login } = useSelector(selectLogin).login
  const router = useRouter()
  //console.log(props.login)

  async function handleSignOut() {
    await axios
      .get('http://localhost:3000/api/signOutRequest')
      .then(response => {
        dispatch(signOut())
        router.push('/')
      })
      .catch(console.log)
  }

  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <button onClick={() => handleSignOut()}>SignOut</button>

      {props.login.isAuth === true ? (
        <>
          <h1>User: {props.login.user.username}</h1>
          <h1>Email: {props.login.user.email}</h1>
        </>
      ) : (
        <>
          <h1>User: {login.user.username}</h1>
          <h1>Email: {login.user.email}</h1>
        </>
      )}

      <h1>ReactJS Cookies</h1>
      <p>Hello World!</p>
      <Link href="/">Home</Link>
    </Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ctx => {
    const { ['codeleap']: token } = parseCookies(ctx)
    let username
    let email
    if (token) {
      await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/cookiesRecovery',
        headers: { cookie: ctx.req.headers.cookie }
      })
        .then(res => {
          const dados: any = res.data
          username = dados.username
          email = dados.email
          store.dispatch(
            loginSuccess({
              username,
              email
            })
          )
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {
        login: store.getState().login.login
      }
    }
  }
)

export default Cookies
