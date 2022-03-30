import Head from 'next/head'
import React from 'react'
import { Container } from '../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <h1>ReactJS Structure</h1>
      <p>Hello World!</p>
    </Container>
  )
}

export default Home
