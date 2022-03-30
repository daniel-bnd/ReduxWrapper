import { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { wrapper } from '../redux/store'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default wrapper.withRedux(MyApp)
