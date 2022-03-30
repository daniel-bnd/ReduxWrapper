import axios from 'axios'
import Head from 'next/head'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from '../redux/store'
import { selectProfile, setProfileData } from '../redux/store/slices/profile'
import { Container } from '../styles/pages/Home'

const Home: React.FC = () => {
  const { profile } = useSelector(selectProfile)
  const dispatch = useDispatch()
  // console.log(profile.map(p => p.title))

  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <h1>ReactJS Structure</h1>
      <p>Hello World!</p>
      {profile.map(p => p.title)}
    </Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ctx => {
    await axios
      .get('http://localhost:3000/api/getAllPosts')
      .then(res => {
        store.dispatch(setProfileData(res.data))
      })
      .catch(console.log)

    return {
      props: {}
    }
  }
)

export default Home
